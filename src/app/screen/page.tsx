import React from "react";
import act1 from "./act1.json";
import act2 from "./act2.json";

function Page() {
  return (
    <div className="w-full bg-white p-20">
      <div className="text-black">Youre curious. I like that</div>
      <div className="c6 doc-content">
        <div className="my-4">
          <span>ACT 1:</span>
          {act1.map((scene, index) => (
            <div
              key={index}
              className={!scene.released ? "invisible my-2" : "my-2"}
              dangerouslySetInnerHTML={{ __html: scene.html }}
            />
          ))}
        </div>
        <div className="my-4">
          <span>ACT 2:</span>
          {act2.map((scene, index) => (
            <div
              key={index}
              className={!scene.released ? "invisible my-2" : " my-2"}
              dangerouslySetInnerHTML={{ __html: scene.html }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
