import { StudioTabs } from "@/components/studioNavigationBar";
import { useState } from "react";
import { STUDIO_TABS } from "../../../constants";
import Styles from "../studioStyles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import StudioLogo from "@/components/studioLogo";

export default function StudioFertility() {
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
            pathname: "/studio/fertility/fitness",
            query: {
              diseaseName: "FERTILITY",
              sessionName: "FITNESS",
            },
          }}
        >
          <img
            src="/assets/images/studio/fitnessFertility.png"
            alt="fitnessFertility"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/fertility/knowledge",
            query: {
              diseaseName: "FERTILITY",
              sessionName: "KNOWLEDGE",
            },
          }}
        >
          <img
            src="/assets/images/studio/knowledgeFertility.png"
            alt="knowledgeFertility"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/fertility/nutrition",
            query: {
              diseaseName: "FERTILITY",
              sessionName: "NUTRITION",
            },
          }}
        >
          <img
            src="/assets/images/studio/nutritionFertility.png"
            alt="nutritionFertility"
          />
        </Link>
        <Link
          href={{
            pathname: "/studio/fertility/realwomen",
            query: {
              diseaseName: "FERTILITY",
              sessionName: "REAL_WOMEN_REAL_STORIES",
            },
          }}
        >
          <img
            src="/assets/images/studio/storiesFertility.png"
            alt="storiesFertility"
          />
        </Link>
      </div>
    </div>
  );
}
