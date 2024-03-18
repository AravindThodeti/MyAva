import { useRouter } from "next/router";
import Styles from "./studioNavigation.module.scss";

export function StudioTabs({ data, studioTabsHandler, textColor }) {
  const router = useRouter();

  return (
    <div className={Styles.navStyle}>
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            studioTabsHandler.settabState(item);
            const tab = item.toLowerCase();
            if (tab === "live") {
              router.push("/studio/").then(() => window.scrollTo(0, 0));
            } else {
              router.push("/studio/" + tab).then(() => window.scrollTo(0, 0));
            }
          }}
        >
          <div
            style={{
              padding: "13px 14px 5px 17px",
              fontSize: "14px",
              fontWeight: studioTabsHandler.tabState === item ? "800" : "600",
              color:
                studioTabsHandler.tabState === item ? "#FFFFFF" : textColor,
              borderBottom:
                studioTabsHandler.tabState === item ? "1px solid #FFFFFF" : "",
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
