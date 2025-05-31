"use client";
import * as React from "react";
import clsx from "clsx";
import { ListActionEnum, ListContext } from "../../context";
import Flag from 'react-world-flags';

export const NavbarList = () => {
  const { state, dispatch } = React.useContext(ListContext);

  const handleClickSelect = () => {
    dispatch({
      type: ListActionEnum.SetSettingsData,
      payload: {
        ...state.settings,
        select: true,
      },
    });
  };

  const handleClickReset = () => {
    dispatch({
      type: ListActionEnum.SetSettingsData,
      payload: {
        ...state.settings,
        select: true,
      },
    });
  };

  const handleClickCancel = () => {
    dispatch({
      type: ListActionEnum.SetSettingsData,
      payload: {
        ...state.settings,
        select: false,
      },
    });
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "bg-gray-90",
        "w-full h-[44px]",
        "fixed top-0",
        "max-w-[1200px]",
        "px-[1.5rem]"
      )}
    >
      <Flag code="ID" className="w-10 h-10 object-cover rounded-full" />
      {state.settings.select ? (
        <div
          className={clsx(
            "flex items-center justify-end gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            className={clsx("text-[0.875rem] text-red font-semibold")}
            onClick={handleClickReset}
          >
            {"Reset"}
          </button>
          <button
            className={clsx("text-[0.875rem] text-white font-semibold")}
            onClick={handleClickCancel}
          >
            {"Cancel"}
          </button>
        </div>
      ) : (
        <div
          className={clsx(
            "flex items-center justify-end gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            className={clsx("text-[0.875rem] text-blue font-semibold")}
            onClick={handleClickSelect}
          >
            {"Select"}
          </button>
        </div>
      )}
    </div>
  );
};
