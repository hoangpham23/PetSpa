import axios from "axios";
import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChoosePet_style.module.css";
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

function ChoosePet() {
  return (
    <div>
      <HeaderForCus />
      <section>
        <div className={style.PetInfo_container}>
          <h1>CHOOSE PET FOR SERVICES</h1>
          <div className={style.PetInfo_box}>
            <p>PET 1</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
          <div className={style.PetInfo_box}>
            <p>PET 2</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
          <div className={style.PetInfo_box}>
            <p>PET 3</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
        </div>
        <div className={style.add}>
                <input type="submit" value="ADD PET" className={style.btn}/>
            </div>
      </section>
    </div>
  );
}

export default ChoosePet;
