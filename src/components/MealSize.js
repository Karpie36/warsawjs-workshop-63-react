import * as React from "react";
import { Label } from "semantic-ui-react";

const text = {
  SMALL: "mała porcja",
  MEDIUM: "średnia porcja",
  BIG: "duża porcja",
};

const MealSizeWithHook = (props) => {
  const [isHover, setHover] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if(node) {
      node.addEventListener("mouseover", () => setHover(true))
      node.addEventListener("mouseout", () => setHover(false));
    }
  })

  return (
    <span ref={ref}>
      <Label {...props} showDetail={isHover}/>
    </span>
  );
};

const MealSize = (props) => (
  <Label
    icon="shopping basket"
    content={props.showDetail ? text[props.demand] : props.demand}
  />
);

export default MealSizeWithHook;
