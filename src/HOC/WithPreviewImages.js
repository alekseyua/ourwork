import React from "react";
import { fakeImageFile } from "../images";
import { connectStoreon } from "storeon/react";
import { delay, funcDelay } from "../helpers/const";
import { ACTION_OPEN_MODAL } from "../store/helpers/helpers-store";
import { unicIteemsJoinArrays } from "../helpers/helpers";

export default function WithPreviewImages(Component) {
  class PreviewUploadImages extends React.PureComponent {
    // onChange - передаёт в функцию добавляет и удаляет файлы с локального state

    state = {
      isLoadFetch: false,
      preview: [], // this.props.listImages ??
      toolTipAction: {
        isShow: false,
        message: "",
      },
      loadingPreviewImage: [], // список изображений для удаления
      loadingServerImages: true,
    };

    componentDidMount() {
      // console.log(this.props.listImages);
      if (this.props?.listImages?.length) {
        return this.setState((state) => ({
          ...state,
          isLoadFetch: true,
          preview: unicIteemsJoinArrays(state.preview, this.props.listImages),          
        }));
      }
    }
    componentWillUnmount() {
      this.setState((state) => ({
        ...state,
        isLoadFetch: false,
        loadingServerImages: true,
        loadingPreviewImage: [],
        preview: [],
      }));
    }
    componentDidUpdate(prevProps, prevState) {
      if (
        (this.props?.listImages !== undefined ||
          this.props?.listImages !== null) &&
        this.props?.listImages?.length < prevProps?.listImages?.length
      ) {
        //   if (this.props?.listImages?.length < prevProps?.listImages?.length) {
        //     return this.setState((state) => {
        //       let listUnicId = Array.from(
        //         new Set(
        //           [
        //             ...state.preview,
        //             ...serializeFileList(this.props.listImages),
        //           ].map((el) => el.id)
        //         )
        //       );
        //       return {
        //         ...state,
        //         isLoadFetch: true,
        //         preview: [
        //           ...state.preview,
        //           ...serializeFileList(this.props.listImages),
        //         ].reduce((acc, cur, index, arr) => {
        //           if (listUnicId.includes(cur.id)) {
        //             listUnicId = listUnicId.filter((el) => el !== cur.id);
        //             acc = [...acc, cur];
        //           }
        //           return acc;
        //         }, []),
        //       };
        //     });
        //   }

        //   if (
        //     this.props?.listImages?.length !== prevProps?.listImages?.length &&
        //     this?.state?.loadingServerImages
        //   ) {
        //     return this.setState((state) => ({
        //       ...state,
        //       isLoadFetch: true,
        //       loadingServerImages: false,
        //       preview: [...serializeFileList(this.props.listImages)],
        //     }));
        //   }
        //   if (
        //     this.props?.listImages?.length !== 0 &&
        //     this.props?.listImages?.length !== this.state?.preview?.length &&
        //     this?.state?.loadingServerImages
        //   ) {
        //     return this.setState((state) => ({
        //       ...state,
        //       isLoadFetch: true,
        //       loadingServerImages: false,
        //       preview: [...serializeFileList(this.props.listImages)],
        //     }));
        //   }
        // } else {
        return this.setState((state) => ({
          ...state,
          isLoadFetch: true,
          loadingServerImages: false,
          // preview: [
          //   ...this.props?.listImages,
          //   ...serializeFileList(this.state.preview),
          // ],
          preview: unicIteemsJoinArrays(state.preview, this.state.preview),
        }));
      }
    }
    handlerShowTooltip = (action) => {
      this.setState({
        toolTipAction: {
          isShow: true,
          message: "Изображение удаляется",
        },
      });

      const timer = setTimeout(() => {
        this.setState({
          toolTipAction: {
            isShow: false,
            message: "",
          },
        });
        return () => clearTimeout(timer);
      }, 1000);
    };

    deleteImage = ({ id, key }) => {
      let newImagesFromDelet = [];

      return funcDelay(async () => {
        if (!`${id}`.includes("local")) {
          const countFilesReciveFromServer =
            +this.getCountFilesReciveFromServer(this.state.preview);
          const countFilesReciveFromServerSendByDelete =
            +this.getCountFilesReciveFromServerSendByDelete(this.state.preview);
          if (countFilesReciveFromServer === 1) return this.openNotice();
          if (
            +countFilesReciveFromServerSendByDelete ===
            countFilesReciveFromServer - 1
          )
            return this.openNotice();
          this.setState((state) => ({
            ...state,
            isLoadFetch: true,
            loadingPreviewImage: [...state.loadingPreviewImage, id],
          }));
          const newPreviewImagesFromDelet = this.state.preview.reduce(
            (acc, cur) => {
              if (cur.id !== id) acc = [...acc, cur];
              return acc;
            },
            []
          );

          await delay(500);

          const callbackDelate = async (res) => {
            let newList = [...this.state.preview];
            let newListLocal = this.resetFilesReciveFromServer([
              ...this.state.preview,
            ]);
            let loadingPreviewImageNew = [...this.state.loadingPreviewImage];
            for (let id of this.state.loadingPreviewImage) {
              newList = newList.filter((el) => el.id !== id);
              loadingPreviewImageNew = loadingPreviewImageNew.filter(
                (el) => el.id !== id
              );
            }
            this.setState((state) => ({
              ...state,
              isLoadFetch: false,
              loadingPreviewImage: [...loadingPreviewImageNew],
              preview: [...newList],
            }));
            await delay(500);

            this.props?.onChange &&
              this.props.onChange({
                key,
                value: newListLocal,
                callback: () => {},
              });
          };
          this.props?.handlerDeleteImage &&
            this.props?.handlerDeleteImage({ id, callback: callbackDelate });
        } else {
          if (this?.state[key]) {
            newImagesFromDelet = this.state[key].reduce((acc, cur) => {
              if (cur.id !== id) acc = [...acc, cur];
              return acc;
            }, []);
          }
          const newPreviewImagesFromDelet = this.state.preview.reduce(
            (acc, cur) => {
              if (cur.id !== id) acc = [...acc, cur];
              return acc;
            },
            []
          );
          this.setState((state) => ({
            ...state,
            isLoadFetch: false,
            preview: [...newPreviewImagesFromDelet],
            [key]: [...newImagesFromDelet],
          }));
          await delay(500);
          this.props?.onChange &&
            this.props.onChange({
              key,
              value: this.resetFilesReciveFromServer([...newImagesFromDelet]),
              callback: () => {},
            });
        }
      }, 100);
    };

    heandlerAddFilesToPreview = async ({ key, files }) => {
      let addNewFiles = [];
      if (this.state[key]) {
        addNewFiles = [...this.state[key], ...files];
      } else {
        addNewFiles = [...files];
      }
      // console.log([...this.state.preview, ...serializeFileList(addNewFiles)]);
      // this.setState((state) => ({
      //   ...state,
      //   preview: [...state.preview, ...(serializeFileList(addNewFiles))],
      //   [key]: addNewFiles,
      // }));
      this.setState((state) => ({
          ...state,
          isLoadFetch: true,
          preview: unicIteemsJoinArrays(state.preview,addNewFiles),
          [key]: addNewFiles,
      }));
      await delay(500);
      this.props?.onChange &&
        this.props.onChange({
          key,
          value: [...this.state[key]],
          callback: () => {},
        });
    };

    getCountFilesReciveFromServer = (files) =>
      files.filter((el) => el?.id && !`${el?.id}`.includes("local")).length;
    getCountFilesReciveFromServerSendByDelete = (files) =>
      files
        .filter((el) => el?.id && !`${el?.id}`.includes("local"))
        .filter(
          (el) => el?.id && this.state.loadingPreviewImage.includes(el.id)
        ).length;

    resetFilesReciveFromServer = (files) =>
      files.filter((el) => el?.id && `${el?.id}`.includes("local"));

    openNotice = () =>
      this.props.dispatch(ACTION_OPEN_MODAL, {
        show: true,
        content: "Вы не можете удалить \nпоследнее изображение с сервера",
        contentBtn: "Ок",
        error: true,
      });

    

    addFakeImage = (countFakeImage = 3) => {
      const listFakeImage = [];
      for (let i = 0; i < countFakeImage; i++) {
        listFakeImage = [
          ...listFakeImage,
          { url: fakeImageFile, type: "image" },
        ];
      }
      if (!this.state.preview.length) {
        this.setState((state) => ({
          ...state,
          preview: listFakeImage,
        }));
      }
    };

    render() {
      return (
        <Component
          preview={this.state.preview}
          deleteImage={this.deleteImage}
          handlerShowTooltip={this.handlerShowTooltip}
          toolTipAction={this.state.toolTipAction}
          loadingPreviewImage={this.state.loadingPreviewImage}
          heandlerAddFilesToPreview={this.heandlerAddFilesToPreview}
          {...this.props}
        />
      );
    }
  }
  return connectStoreon(PreviewUploadImages);
}
