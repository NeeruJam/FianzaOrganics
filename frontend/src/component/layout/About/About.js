import React from "react";
import "./aboutSection.css";
import { Button, Typography } from "@material-ui/core";
import InstagramIcon from "@mui/icons-material/Instagram";

function About() {
  
  return (
    <div className="aboutSection">
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <img src={require("./fianza_logo.jpg")} />

            <h2>Fianza Organics</h2>
           
            <p >
              Hi, I am Vigneswari, the founder of Fianza Organics and Cosmetics.
              I am here to help you with your daily personal care products. If
              you are looking for chemical free and safe to use products, then
              Fianza is the go-to brand. We humans have distinct facial
              features, diverse complexions, different hair and skin types and
              this difference makes each one of us beautiful. Keeping this in
              mind, we have developed wide range of products which are
              customized specially for you. Fianza was born about three years
              ago, when I began my search for organic cosmetics. Being married
              to a military guy, we were exposed to varied climatic conditions
              and faced a lot of skin allergies as we were constantly
              travelling. Initially to solve these problems, I attended many
              “DIY” skin care workshops where I learnt a lot. Soon, I started
              making these products at home and got really good results. Seeing
              this, my friends started placing orders, for their personal use.
              While preparing, I realized I had to make products with different
              formulations specific to each and every customer. This pushed me
              to concentrate on my own formulations and make skin products
              suiting individual requirements. Now, to add credibility to my
              work and expand my learning, I did PG Diploma in Cosmetic
              Technology from IGMPI, Delhi. Finally, I would like to sum up with
              an answer to the question “Why the name Fianza??? The word
              “Fianza” means Bond in Spanish language. Somewhere all along in
              this journey, I realized that the bond between nature and beauty
              is of great significance. 
            </p>
            <h5>That's what “Fianza” is all about. “HAPPY
              BONDING”</h5>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Visit Us</Typography>

            <a href="https://www.instagram.com/fianza_organics">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
