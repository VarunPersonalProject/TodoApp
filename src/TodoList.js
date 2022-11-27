import React from "react";

export default function TodoList({
  todoList,
  onSelected,
  handleEditCancel,
  handleSave,
  handleEditInput,
}) {
  return todoList.map((oItem) => (
    <div key={oItem.id} className="flex justify-between my-4">
      {oItem.isEdit ? (
        <input
          maxLength={50}
          onInput={(oEvent) => handleEditInput(oEvent, oItem.id)}
          value={oItem.itemName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
          type="text"
        />
      ) : (
        <div className="flex items-center">
          <input
            onChange={() => onSelected(oItem.id)}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={oItem.isCheck}
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            {oItem.itemName}
          </label>
        </div>
      )}
      <div className="flex justify-between">
        {oItem.isEdit ? (
          <button
            onClick={(oEvent) => handleSave(oEvent, oItem.id)}
            type="submit"
            className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        ) : (
          <></>
        )}

        <button
          onClick={(oEvent) => handleEditCancel(oEvent, oItem.id)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {oItem.isEdit ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  ));
}
