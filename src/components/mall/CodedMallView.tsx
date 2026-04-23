import { Floor } from "@/data/mallData";
import MallCeiling from "./MallCeiling";
import MallFloorRow from "./MallFloorRow";

interface CodedMallViewProps {
  floors: Floor[]; // expects floors 1 and 2 (3 is rendered separately)
}

/**
 * CodedMallView — שחזור מקודד פיקסל-לפיקסל של חלק העליון של הקניון:
 *  - כיפת פרסקו עם מסגרת זהב (MallCeiling)
 *  - שתי קומות חנויות עם שלטים, שערים מרכזיים, עמודי זהב, רצפת שיש (MallFloorRow)
 * כולן קומפוננטות DOM אמיתיות וניתנות לעריכה ויזואלית בכל רכיב.
 */
const CodedMallView = ({ floors }: CodedMallViewProps) => {
  const [floor1, floor2] = floors;

  return (
    <div className="relative w-full mx-auto max-w-[1630px] min-w-[900px]">
      {/* כיפת פרסקו עליונה */}
      <MallCeiling />

      {/* קומה 1 - מתחת לכיפה ישירות */}
      {floor1 && <MallFloorRow floor={floor1} isLast={false} />}

      {/* קומה 2 */}
      {floor2 && <MallFloorRow floor={floor2} isLast={false} />}
    </div>
  );
};

export default CodedMallView;