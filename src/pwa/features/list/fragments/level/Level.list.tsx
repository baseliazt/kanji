"use client";
import { useContext } from "react";
import clsx from "clsx";
import { LevelTabButton } from "@/pwa/core/components/level_tab_button";
import { ListContext } from "../../context";
import { components } from "@/api/docs/openapi/generated/openapi";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetKanjiList } from "../../react-query/hooks";

export const LevelList = () => {
  const { state } = useContext(ListContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");
  const { mutateAsync: getKanjiList } = useGetKanjiList();

  const selectedLevel = !level
    ? state.level.data?.find((item) => item.name === "N5")
    : state.level.data?.find((item) => item.name === level);

  const handleClickLevelTabButton = async (
    data: components["schemas"]["Level"]
  ) => {
    if (data.name === "N5") {
      router.push("/");
    } else {
      router.push(`?level=${data.name}`);
    }
    await getKanjiList(data);
  };

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.level.data?.map((level) => (
        <LevelTabButton
          key={level.id}
          selected={selectedLevel?.id === level?.id}
          onClick={() => handleClickLevelTabButton(level)}
        >
          {level.name}
        </LevelTabButton>
      ))}
    </div>
  );
};
