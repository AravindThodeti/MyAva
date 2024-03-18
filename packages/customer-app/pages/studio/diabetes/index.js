import { StudioTabs } from "@/components/studioNavigationBar";
import { useState } from "react";
import { STUDIO_TABS } from "../../../constants";
import Styles from "../studioStyles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import StudioLogo from "@/components/studioLogo";

export default function StudioDiabetes() {
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
            pathname: "/studio/diabetes/fitness",
            query: {
              diseaseName: "DIABETES",
              sessionName: "FITNESS",
            },
          }}
        >
          <img
            src="/assets/images/studio/fitnessDiabetes.png"
            alt="fitnessDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/diabetes/knowledge",
            query: {
              diseaseName: "DIABETES",
              sessionName: "KNOWLEDGE",
            },
          }}
        >
          <img
            src="/assets/images/studio/knowledgeDiabetes.png"
            alt="knowledgeDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/diabetes/nutrition",
            query: {
              diseaseName: "DIABETES",
              sessionName: "NUTRITION",
            },
          }}
        >
          <img
            src="/assets/images/studio/nutritionDiabetes.png"
            alt="nutritionDiabetes"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/diabetes/realwomen",
            query: {
              diseaseName: "DIABETES",
              sessionName: "REAL_WOMEN_REAL_STORIES",
            },
          }}
        >
          <img
            src="/assets/images/studio/storiesDiabetes.png"
            alt="storiesDiabetes"
          />
        </Link>
      </div>
    </div>
  );
}
