import React from 'react'
import styles from './styles/fixbugs.module.scss'
import BlockTitle from '../../View/Blocks/BlockTitle'
import WrapTitleDescBlockOpacity from '../../View/Blocks/WrapTitleDescBlockOpacity';
import WrapContainer from '../../View/WrapContainer/WrapContainer';
import Offset from '../../View/Offset';
import AccordionContainer from '../../Components/Component.Accardion/AccordionContainer';
export default function FixBugs({ listMounthFixedBugs, handlerChangeStateMounth }) {
  return (
    <WrapContainer className={styles["fixbugs__container"]}>
      <Offset mb={15} />
      <AccordionContainer
        styleItem={{
          paddingTop: "14px ",
          paddingBottom: "14px ",
          filter: `blur(var(--filter-blur))`,
        }}
        styleItemIcon={{
          width: "14px",
          height: "14px",
        }}
        list={listMounthFixedBugs}
        onChange={handlerChangeStateMounth}
      />
    </WrapContainer>
  );
}
