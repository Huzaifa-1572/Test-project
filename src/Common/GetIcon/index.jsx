import React from "react";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as cgIcons from "react-icons/cg";
import * as ciIcons from "react-icons/ci";
import * as diIcons from "react-icons/di";
import * as faIcons from "react-icons/fa";
import * as fcIcons from "react-icons/fc";
import * as fiIcons from "react-icons/fi";
import * as giIcons from "react-icons/gi";
import * as goIcons from "react-icons/go";
import * as grIcons from "react-icons/gr";
import * as hi2Icons from "react-icons/hi2";
import * as imIcons from "react-icons/im";
import * as ioIcons from "react-icons/io";
import * as luIcons from "react-icons/lu";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";
import * as rxIcons from "react-icons/rx";
import * as siIcons from "react-icons/si";
import * as slIcons from "react-icons/sl";
import * as tbIcons from "react-icons/tb";
import * as tiIcons from "react-icons/ti";
import * as wiIcons from "react-icons/wi";

export const GetIcon = ({ icon, className, size, color }) => {
    const getIcon = (iconName) => {
        const iconsMap = new Map();
        iconsMap.set('Bs', bsIcons);
        iconsMap.set('Ai', aiIcons);
        iconsMap.set('Bi', biIcons);
        iconsMap.set('Ci', ciIcons);
        iconsMap.set('Cg', cgIcons);
        iconsMap.set('Di', diIcons);
        iconsMap.set('Fi', fiIcons);
        iconsMap.set('Fc', fcIcons);
        iconsMap.set('Gi', giIcons);
        iconsMap.set('Fa', faIcons);
        iconsMap.set('Md', mdIcons);
        iconsMap.set('Tb', tbIcons);
        iconsMap.set('Hi', hi2Icons);
        iconsMap.set('Go', goIcons);
        iconsMap.set('Gr', grIcons);
        iconsMap.set('Im', imIcons);
        iconsMap.set('Io', ioIcons);
        iconsMap.set('Ri', riIcons);
        iconsMap.set('Si', siIcons);
        iconsMap.set('Sl', slIcons);
        iconsMap.set('Ti', tiIcons);
        iconsMap.set('Wi', wiIcons);
        iconsMap.set('Rx', rxIcons);
        iconsMap.set('Lu', luIcons);

        return iconsMap.get(iconName.substring(0, 2));
    };

    const icons = getIcon(icon);

    if (!icons || !icons[icon]) {
        return <faIcons.FaQuestionCircle className={className} size={size || 32} color={color} />;
    }

    const TheIcon = icons[icon];

    return <TheIcon className={className} size={size || 32} color={color} />;
};
