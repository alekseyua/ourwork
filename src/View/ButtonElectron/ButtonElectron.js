import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import { isElectron } from "../../helpers/utils";
import { Dimensions } from "react-native-web";
import Button from "../../View/Button/Button";
import { widthMobile } from "../../helpers/config";

const ButtonElectron = ({ }) => {
  const { controllButton } = useStoreon('controllButton');
  const [changeHeight, setChangeHeight] = useState(0);
  const [isEnable, setIsEnable] = useState(true);
  function getHEight() {
    const height = Dimensions.get('window').height;
    return height;
  }

  useEffect(() => {
    window.addEventListener('scroll', (e) => setChangeHeight(document.documentElement.scrollHeight - document.documentElement.scrollTop - getHEight() + 20))
  })

  useEffect(() => {
    let len = isElectron() ? window.pageYOffset : window.innerHeight;
    setChangeHeight(document.documentElement.scrollHeight - getHEight() + 20);
  }, [])

  // if(isElectron() || process.env.NODE_ENV === "development"){ 
  return (
    <div
      style={{
        // bottom: controllButton.show? (isLinux()? changeHeight + 15 : changeHeight +10) : '-1000%',
        bottom: 97,
        position: 'absolute',
        pointerEvents: controllButton.show ? 'all' : 'none',
        // left: '49.5vw'
      }}
    >
      <Button
        style={{
          width: widthMobile-30,
          visibility: controllButton.show ? 'visible' : 'hidden',
          opacity: controllButton.show ? 1 : 0,
        }}
        // disabled={false}
        // disabled={!isEnable && !(controllButton.show)}
        type={'submit'}
        addClass={'button__controll-incoming--red--full'}
        // active={controllButton.show}
        onClick={() => {
          setIsEnable(false)
          return controllButton.action()
        }}
      >
        {controllButton.name}
      </Button>
    </div>
  )
  // }
  // return null;
}

export default ButtonElectron;