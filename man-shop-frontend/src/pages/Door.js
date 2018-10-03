import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import DoorWrapper from "../components/door/DoorWrapper/DoorWrapper";
import DoorList from "../components/door/DoorList/DoorList";

const Door = () => {
  return (
    <div>
      <PageTemplate>
        <DoorWrapper>
          <DoorList />
        </DoorWrapper>
      </PageTemplate>
    </div>
  );
};

export default Door;
