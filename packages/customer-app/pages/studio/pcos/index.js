import { StudioTabs } from "@/components/studioNavigationBar";
import { useState } from "react";
import { STUDIO_TABS } from "../../../constants";
import Styles from "../studioStyles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import StudioLogo from "@/components/studioLogo";

export default function StudioPcos() {
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
            pathname: "/studio/pcos/fitness",
            query: {
              diseaseName: "PCOS",
              sessionName: "FITNESS",
            },
          }}
        >
          <img src="/assets/images/studio/fitnessPcos.png" alt="fitnessPcos" />
        </Link>
        <Link
          href={{
            pathname: "/studio/pcos/knowledge",
            query: {
              diseaseName: "PCOS",
              sessionName: "KNOWLEDGE",
            },
          }}
        >
          <img
            src="/assets/images/studio/knowledgePcos.png"
            alt="knowledgePcos"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/pcos/nutrition",
            query: {
              diseaseName: "PCOS",
              sessionName: "NUTRITION",
            },
          }}
        >
          <img
            src="/assets/images/studio/nutritionPcos.png"
            alt="nutritionPcos"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/pcos/realwomen",
            query: {
              diseaseName: "PCOS",
              sessionName: "REAL_WOMEN_REAL_STORIES",
            },
          }}
        >
          <img src="/assets/images/studio/storiesPcos.png" alt="storiesPcos" />
        </Link>
      </div>
    </div>
  );
}
