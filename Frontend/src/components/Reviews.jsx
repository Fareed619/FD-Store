import { IoStarHalfOutline } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

const Reviews = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5 ? 1 : 0;
  const empyStars = 5 - fullStars - halfStar;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".2rem",
        margin: ".4rem 0",
      }}
    >
      {[...new Array(fullStars)].map((_, i) => (
        <IoStar key={i} />
      ))}
      {halfStar ? <IoStarHalfOutline /> : null}
      {[...new Array(empyStars)].map((_, i) => (
        <IoStarOutline key={i} />
      ))}
      {/* <span> {value} reviews</span> */}
    </div>
  );
};

export default Reviews;
