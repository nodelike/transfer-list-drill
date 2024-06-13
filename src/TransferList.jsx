import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function TransferList() {
  const [list1, setList1] = useState({ "React": false, "Angular": false, "Vue": false, "Svelte": false });
  const [list2, setList2] = useState({ "HTML": false, "CSS": false, "JS": false, "TS": false });

  const transferAll = (left) => {
    if (left) {
      const newList1 = { ...list1, ...list2 };
      setList1(newList1);
      setList2({});
    } else {
      const newList2 = { ...list2, ...list1 };
      setList1({});
      setList2(newList2);
    }
  };

  const shiftItem = (left) => {
    let newList1;
    let newList2;
    if (left) {
      const checkedItems = Object.fromEntries(Object.entries(list2).filter(([key, value]) => value).map(([key, value]) => [key, false]));
      const nonCheckedItems = Object.fromEntries(Object.entries(list2).filter(([key, value]) => !value));
      newList1 = { ...list1, ...checkedItems };
      newList2 = nonCheckedItems;
    } else {
      const checkedItems = Object.fromEntries(Object.entries(list1).filter(([key, value]) => value).map(([key, value]) => [key, false]));
      const nonCheckedItems = Object.fromEntries(Object.entries(list1).filter(([key, value]) => !value));
      newList1 = nonCheckedItems;
      newList2 = { ...list2, ...checkedItems };
    }
    setList1(newList1);
    setList2(newList2);
  };

  const anyCheckedInList = (list) => {
    return Object.values(list).some(value => value === true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className='text-2xl font-semibold text-center py-4'>TRANSFER LIST</h2>
      <div className="w-4/5 flex border-2 border-black">
        <div className="w-full p-6">
          <ul className='list-none flex flex-col gap-4'>
            {Object.keys(list1).map((listItem) => (
              <li className='text-base' key={listItem}>
                <input checked={list1[listItem]} type="checkbox" className='mr-5' onChange={() => { setList1({ ...list1, [listItem]: !list1[listItem] }) }}/>{listItem}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-20 border-r-2 border-l-2 border-black p-6 justify-between">
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white' onClick={() => { transferAll(true) }}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button className={`grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white ${anyCheckedInList(list2) ? '' : 'disabled:bg-gray-200'}`} disabled={!anyCheckedInList(list2)} onClick={() => { shiftItem(true) }}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className={`grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white ${anyCheckedInList(list1) ? '' : 'disabled:bg-gray-200'}`} disabled={!anyCheckedInList(list1)} onClick={() => { shiftItem(false) }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button className='grid place-content-center bg-gray-500 px-4 py-1 rounded-sm border-1 border-black text-white' onClick={() => { transferAll(false) }}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
        <div className="w-full p-6">
          <ul className='list-none flex flex-col gap-4'>
            {Object.keys(list2).map((listItem) => (
              <li className='text-base' key={listItem}>
                <input checked={list2[listItem]} type="checkbox" className='mr-5' onChange={() => { setList2({ ...list2, [listItem]: !list2[listItem] }) }}/>{listItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TransferList;