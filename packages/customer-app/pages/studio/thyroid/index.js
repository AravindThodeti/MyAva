import { StudioTabs } from "@/components/studioNavigationBar";
import { useState } from "react";
import { STUDIO_TABS } from "../../../constants";
import Styles from "../studioStyles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import StudioLogo from "@/components/studioLogo";

export default function StudioThyroid() {
  const router = useRouter();
  const pathname = router.pathname.replace("/studio/", "").toUpperCase();
  const [tabState, settabState] = useState(pathname);
  return (
    <div className={Styles.container}>
      <div style={{ position: "relative" }}>
        <StudioLogo
          title="Studio"
          color="white"
          src="/assets/images/studio/playIconWhite.svg"
        />
        <StudioTabs
          data={STUDIO_TABS}
          studioTabsHandler={{ tabState, settabState }}
          textColor="#949494"
        />
      </div>
      <div className={Styles.diseaseContent}>
        <Link
          href={{
            pathname: "/studio/thyroid/fitness",
            query: {
              diseaseName: "THYROID",
              sessionName: "FITNESS",
            },
          }}
        >
          <img
            src="/assets/images/studio/fitnessThyroid.png"
            alt="fitnessDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/thyroid/knowledge",
            query: {
              diseaseName: "THYROID",
              sessionName: "KNOWLEDGE",
            },
          }}
        >
          <img
            src="/assets/images/studio/knowledgeThyroid.png"
            alt="knowledgeDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/thyroid/nutrition",
            query: {
              diseaseName: "THYROID",
              sessionName: "NUTRITION",
            },
          }}
        >
          <img
            src="/assets/images/studio/nutritionThyroid.png"
            alt="knowledgeDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/thyroid/realwomen",
            query: {
              diseaseName: "THYROID",
              sessionName: "REAL_WOMEN_REAL_STORIES",
            },
          }}
        >
          <img
            src="/assets/images/studio/storiesThyroid.png"
            alt="knowledgeDiabetes"
          />
        </Link>
      </div>
    </div>
  );
}
