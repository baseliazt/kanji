import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Image from "next/image";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { useSearchParams } from "next/navigation";
import { VocabularyContext } from "../../context";

export const FinishVocabulary = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(VocabularyContext);
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const params = new URLSearchParams({
    level: level?.toString() ?? "",
  });
  const correctAnswer = state.question.data.filter(
    (item) => item.answers.length === 1
  );
  const totalCorrectAnswerCount = correctAnswer.length;
  const totalQuestionNumber = state.question.data.length;
  const wrongAnswer = state.question.data.filter(
    (item) => item.answers.length > 1
  );
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
        "w-full"
      )}
    >
      <Image
        {...dictionaries.finish.illustration}
        className={clsx("w-[240px] h-[240px]")}
      />
      <p>{dictionaries.finish.message}</p>
      <p>{"Stats"}</p>
      <p>{`${totalCorrectAnswerCount}/${totalQuestionNumber}`}</p>
      <p>{"List that you need to take note"}</p>
      <p>{wrongAnswer.map((item) => item.prompt.romanji).join(", ")}</p>
      <Link href={AppCollectionURL.public.chapter(params.toString())}>
        {dictionaries.finish.cta.back.children}
      </Link>
    </div>
  );
};
