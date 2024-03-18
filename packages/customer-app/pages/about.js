import AvaImage from "@/components/v1/Image";
import React from "react";
import { object } from "prop-types";
const data = {
  hustlers: [
    {
      name: "Evelyn",
      imgName: "teamEvelyn",
      designation: "Founder and CEO",
      description: [
        "Hustler, Startup Enthusiast, Rooting for women entrepreneurs!",
        "Rich healthtech startup experience and business mentor to young entrepreneurs.",
        "An avid reader whose favorite book is Art of War- Sun Tzu. A hoarder of travel trinkets and forever hungry for great conversations",
      ],
    },
    {
      name: "Sakshi",
      imgName: "teamSakshi",
      designation: "Business",
      description: [
        "Frontlining the business for Ava. Here’s Sakshi,",
        "A dreamer, dancing and talking her way through life, hoping to make the world a better place, one person at a time. Lists and routines make her the happiest, only to be broken by bouts of binge reading and frequent travel escapades to beaches and mountains alike. Often spends more time around her furry friends than her human friends.",
        "Current achievements: Can lift as much as she weighs and cycle half that number (in kms) 😜",
      ],
    },
    {
      name: "Rhema",
      imgName: "teamRhema",
      designation: "Operations",
      description: [
        "Delivering some amazing customer experience at Ava, Here’s Rhema,",
        "Apart from being a Biomedical engineer, She is enthusiastic about singing, reading and meeting new people. Her qualities of being a grammar nazi and a cleanliness freak are two things that irks her family and friends",
      ],
    },
    {
      name: "Shaarang",
      imgName: "teamShaarang",
      designation: "UI UX Designer",
      description: [
        "Designing some amazing experience for Ava.Here’s Shaarang,",
        "an Architect who has an affection for forms and spaces. His all creative juices are driven by nature and feels very happy when he is around some good surroundings. An enthusiastic sports person with a knack for Mountaineering expeditions, Basketball, Football and Swimmimg.",
      ],
    },
  ],
  doctors: [
    {
      name: "Dr. Apoorva Reddy",
      imgName: "teamApoorva",
      designation: "Gynecologist",
      description: [
        "Award winning Infertility specialist with over 10 years of experience. 70% of her patients have PCOS",
      ],
    },
    {
      name: "Dr. Sonali Kohli",
      imgName: "teamSonali",
      designation: "Dermatologist",
      description: [
        "Dr.Kohli has a 12 year experience in dermatology. Works at the HN Reliance hospital, Mumbai",
      ],
    },
    {
      name: "Dr. Shilpa Kava",
      imgName: "teamShilpa",
      designation: "Gynecologist",
      description: [
        "Ace Gynecologist with 10 years of experience. PGD in Medical Law and Ethics Associated with Sakra Hospital, Oxford Hospital.",
      ],
    },
  ],
  advisor: [
    {
      name: "Aditya Ajmera",
      imgName: "teamAditya",
      designation: "CEO, Chimco Biomedical",
      description: [
        "Aditya is an accomplished individual with 35 years of experience in distribution and marketing of sophisticated medical equipment and devices. He has successfully worked with several well-known global companies for India and overseas market. He is CEO of Chimco Bio Medical Engineering Co. Mumbai Aditya is ambitious businessman and spends lot of time in understanding the new businesses. He is passionate about inspiring and motivating start-ups and entrepreneurs through creative ideas. He enjoys travelling, is also a motivational speaker and practices Zen meditation.",
      ],
    },
  ],
};

function TeamMemberDetail({ data }) {
  return (
    <div
      style={{
        margin: "15px 0px",
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gridColumnGap: "10px",
      }}
    >
      <div style={{ paddingTop: "5px" }}>
        <AvaImage size="team" name={data.imgName} />
        <div
          style={{
            fontSize: "14px",
            color: "#443e41",
            paddingTop: "10px",
            fontWeight: "600",
          }}
        >
          {data.name}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#443e41",
            paddingTop: "2px",
            fontWeight: "500",
          }}
        >
          {data.designation}
        </div>
      </div>
      <div>
        {data.description.map((desc, index) => (
          <div key={index}>{desc}</div>
        ))}
      </div>
    </div>
  );
}
TeamMemberDetail.propTypes = {
  data: object,
};

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <div style={{ padding: 15 }}>
        <AvaImage name="aboutUsHeader" size="aboutUsHeader" />
      </div>
      <div
        style={{
          // height: 570,
          backgroundImage: 'url("/assets/images/about_us_bg.png")',
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            padding: "15px",
            paddingTop: "40px",
          }}
        >
          <span style={{ color: "#873160" }}>About&nbsp;</span>
          <span style={{ color: "#ee4ca3" }}>Us</span>
        </div>
        <div
          style={{
            color: "#4f4f4f",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            Men are from Mars,Women are from Venus and so are their health needs
          </div>
          <div style={{ fontSize: "14px", margin: "15px 0px" }}>
            We’re Redefining women&apos;s wellness and health.{" "}
          </div>
          <div style={{ fontSize: "14px" }}>
            68% of women suffer through at least one chronic condition. These
            conditions require a disciplined and holistic approach to live a
            better quality of life and also alleviate any further fatal
            complications
          </div>
        </div>
        <div
          style={{ fontSize: "18px", fontWeight: "bold", padding: "20px 15px" }}
        >
          <span style={{ color: "#873160" }}>We are every woman’s&nbsp;</span>
          <span style={{ color: "#ee4ca3" }}>health buddy!!</span>
        </div>
        <div
          style={{
            color: "#4f4f4f",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            What do we do?
          </div>
          <div style={{ fontSize: "14px", margin: "15px 0px" }}>
            At Ava, our ethos is holistic healing. We put together a
            personalised team of condition experts like Gynecologists,
            nutritionists, fitness coach, dermatologist etc to help every woman
            through conditions like PCOS, Thyroid, Insulin resistance etc.
          </div>
          <div style={{ fontSize: "14px" }}>
            Our carefully curated Program plans help women with a personalised
            experience in dealing with their health condition
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#4f4f4f",
            fontWeight: "bold",
            padding: "15px",
            paddingTop: 35,
          }}
        >
          Meet the Clan!
        </div>
        <div
          style={{ fontSize: "14px", color: "#4f4f4f", padding: "20px 15px" }}
        >
          We’re a bunch of hustlers!! Our collective focus is to change the
          paradigm of women’s health and wellness across the globe. We wake up
          to this goal every single morning!
        </div>
        <div
          style={{
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{ fontSize: "18px", color: "#4f4f4f", fontWeight: "bold" }}
          >
            Here’s a look at our team of hustlers
          </div>
          {data.hustlers.map((datum, index) => (
            <TeamMemberDetail key={index} data={datum} />
          ))}
          <div
            style={{ fontSize: "18px", color: "#4f4f4f", fontWeight: "bold" }}
          >
            Our Doctors team
          </div>
          {data.doctors.map((datum, index) => (
            <TeamMemberDetail key={index} data={datum} />
          ))}
          <div
            style={{ fontSize: "18px", color: "#4f4f4f", fontWeight: "bold" }}
          >
            Our Advisor
          </div>
          {data.advisor.map((datum, index) => (
            <TeamMemberDetail key={index} data={datum} />
          ))}
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#4f4f4f",
            fontWeight: "bold",
            padding: "15px",
          }}
        >
          Contact Us
        </div>
        <div style={{ padding: "15px", paddingTop: "0px" }}>
          <div
            style={{ fontSize: "14px", color: "#145dcc", fontWeight: "600" }}
          >
            founders@myava.in
          </div>
          <div
            style={{ fontSize: "14px", color: "#145dcc", fontWeight: "600" }}
          >
            support@myava.in
          </div>
          <div
            style={{ fontSize: "14px", color: "#4f4f4f", fontWeight: "600" }}
          >
            +919742020757
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
            backgroundColor: "#fff",
            borderRadius: 5,
            color: "#4f4f4f",
            fontWeight: "bold",
            padding: "15px",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ paddingBottom: "15px" }}>Our Investors</div>
          <AvaImage size="investorsLogo" name="investorsLogo" />
        </div>
      </div>
    </div>
  );
}

//TODO try to write this code in pure reactjs
// let body = `<body>
// <style type="text/css">
//   html {
//     overflow: auto;
//   }

//   html,
//   body,
//   div,
//   iframe {
//     margin: 0px;
//     padding: 0px;
//     height: 100%;
//     border: none;
//   }

//   iframe {
//     display: block;
//     width: 100%;
//     border: none;
//     overflow-y: auto;
//     overflow-x: hidden;
//   }
// </style>
// <!-- This seems to work. Open the mobile view and then open this page -->
// <iframe src="https://blog.myava.in/hidden-about-us/" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%"
//   scrolling="auto">
// </iframe>
// </body>`;
// return (<div  dangerouslySetInnerHTML={{__html: body}} />
// );
