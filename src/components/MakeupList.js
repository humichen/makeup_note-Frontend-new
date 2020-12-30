import React from 'react';
import MakeupListBox from './MakeupListBox';
// 美妝彈出視窗(還要放編輯)
import MakeupModal from "../components/MakeupModal";

const MakeupList = () => {
    return (
        // <!-- 美妝詳細葉面 -->
        <ul className="x-list">
            <MakeupListBox />
            <MakeupModal />
        </ul>
    );
}

export default MakeupList;