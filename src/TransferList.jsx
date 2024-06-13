import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function TransferList() {
  const [list1, setlist1] = useState({ "React": false, "Angular": false, "Vue": false, "Svelte": false });
  const [list2, setlist2] = useState({ "HTML": false, "CSS": false, "JS": false, "TS": false });
  const [moveLeftBtn, setLeftBtn] = useState(true);
  const [moveRightBtn, setRightBtn] = useState(true);

  useEffect(() => {
    const leftBtnState = !Object.values(list2).some(value => value === true);
    const rightBtnState = !Object.values(list1).some(value => value === true);
    setLeftBtn(leftBtnState);
    setRightBtn(rightBtnState);
  }, [list1, list2]);

  const updateCheckState = (list, ele, setFn) => {
    const newList = { ...list, [ele]: !list[ele] };
    setFn(newList);
  };

  const transferAll = (left) => {
    if (left) {
      const newList1 = { ...list1, ...list2 };
      setlist1(newList1);
      setlist2({});
    } else {
      const newList2 = { ...list2, ...list1 };
      setlist1({});
      setlist2(newList2);
    }
  };

  const shiftItem = (left) => {
    let newList1;
    let newList2;
    if (left) {
      const checkedItems = Object.fromEntries(Object.entries(list2).filter(([key, value]) => value).map(([key,value]) => [key, false]));
      const nonCheckedItems = Object.fromEntries(Object.entries(list2).filter(([key, value]) => !value));
      newList1 = { ...list1, ...checkedItems };
      newList2 = nonCheckedItems;
    } else {
      const checkedItems = Object.fromEntries(Object.entries(list1).filter(([key, value]) => value).map(([key,value]) => [key, false]));
      const nonCheckedItems = Object.fromEntries(Object.entries(list1).filter(([key, value]) => !value));
      newList1 = nonCheckedItems;
      newList2 = { ...list2, ...checkedItems };
    }
    setlist1(newList1);
    setlist2(newList2);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className='text-2xl font-semibold text-center py-4'>TRANSFER LIST</h2>
      <div className="w-4/5 flex border-2 border-black">
        <div className="w-full p-6">
          <ul className='list-none flex flex-col gap-4'>
            {Object.keys(list1).map((listItem) => (
              <li className='text-base' key={listItem}><input checked={list1[listItem]} type="checkbox" className='mr-5' onChange={() => { updateCheckState(list1, listItem, setlist1) }}/>{listItem}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-20 border-r-2 border-l-2 border-black p-6 justify-between">
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white' onClick={() => { transferAll(true) }}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white disabled:bg-gray-200' disabled={moveLeftBtn} onClick={() => { shiftItem(true) }}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white disabled:bg-gray-200' disabled={moveRightBtn} onClick={() => { shiftItem(false) }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white' onClick={() => { transferAll(false) }}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
        <div className="w-full p-6">
          <ul className='list-none flex flex-col gap-4'>
            {Object.keys(list2).map((listItem) => (
              <li className='text-base' key={listItem}><input checked={list2[listItem]} type="checkbox" className='mr-5' onChange={() => { updateCheckState(list2, listItem, setlist2) }}/>{listItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TransferList;
