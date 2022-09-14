// 布局信息 存本地

import { useEffect, useState } from 'react';
import { getKv, setKv, delKv } from '@/hooks/useData'
import useUserType from '@/hooks/useUserType';
import _ from 'lodash';

import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
export interface Layout{
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    [key: string]: any
}

export interface Material{
    i: string,
    isUsed: boolean, // 是否正在使用
    t: string, // 标题
    w: number, // 宽度
    isDIY?: boolean, // 是否是DIY
    isDIY2?: boolean, // 是否是diy2.0组件
}

export interface DIYData{
    name: string,
    detail: string | any[] | null,
    sourceUrl?: string
}
export interface DIYCom{
    i: string,
    DIYData: DIYData
}

// 默认布局
const layoutDefault = [
    { i: "a", x: 0, y: 0, w: 4, h: 1, static: true },
    { i: "b", x: 4, y: 0, w: 2, h: 1 },

    { i: "c", x: 0, y: 1, w: 3, h: 1},
    { i: "d", x: 3, y: 1, w: 3, h: 1 },

    { i: "e", x: 0, y: 2, w: 6, h: 1 },

    // { i: "f", x: 0, y: 3, w: 6, h: 1},

    { i: "g", x: 0, y: 3, w: 2, h: 1},
    { i: "h", x: 2, y: 3, w: 4, h: 1 },

    { i: "i", x: 0, y: 4, w: 2, h: 1 },
    { i: "j", x: 2, y: 4, w: 2, h: 1 },
    { i: "k", x: 4, y: 4, w: 2, h: 1 },
];

// 所有物料默认状态
const materialDefault = [
    { i: "a", isUsed: true,t: 'Main Card', w: 4 },
    { i: "b", isUsed: true, t: 'Level Box', w:2 },
    { i: "c", isUsed: true, t: 'My NFT',w:3  },
    { i: "d", isUsed: true, t: 'Recent Activity',w:3 },
    { i: "e", isUsed: true, t: 'My Collection',w:6 },
    { i: "f", isUsed: false, t: 'My Activity',w:6  },
    { i: "g", isUsed: true, t: 'Live Photo',w:2  },
    { i: "h", isUsed: true, t: 'Message',w:4 },
    { i: "i", isUsed: true, t: 'Game1',w:2 },
    { i: "j", isUsed: true, t: 'Game2',w:2 },
    { i: "k", isUsed: true, t: 'Game3', w: 2 },
];


export default function useLayout(account: string) {
    const dispatch = useDispatch<Dispatch>();

    const [material, setMaterial] = useState<Material[]>(materialDefault); // 所有的物料状态
    
    const [layout, setLayout] = useState<Layout[]>(layoutDefault); // 当前布局
    const [prevLayout, setPrevLayout] = useState<Layout[]>(layoutDefault); // 上一次操作的布局，临时状态

    const [DIYDatas, setDIYDatas] = useState<{i: string, DIYData: DIYData}[]>([]);

    const [isDone, setDone] = useState(false); // 是否处理完毕
    const { token } = useUserType();

    // API - 获取布局
    async function getPriceLayout(account: string) {
        const res: any = await getKv(account, 'spaceLayout');
        
        if (res && res.code === 200) {
            return JSON.parse(res.data);
        } else {
            return layoutDefault;
        }
    }

    // API - 获取DIY的存储信息
    async function getDIYDatas(account: string) {
        const res: any = await getKv(account, 'DIYDatas');
        
        if (res && res.code === 200) {
            //console.log('DIYDatas???', JSON.parse(res.data));
            return JSON.parse(res.data);
        } else {
            return [];
        }
    }
    
    /***
     * API - 保存新的布局致服务器
    */
    async function saveNewLayout(newLayout: Layout[], newDIYData?: DIYCom) {
        setLayout(newLayout);
        updateMaterialByLayout(newLayout);

        // 还需要同步一下DIYDatas
        const DIYDatasTemp = DIYDatas.filter((item) => {
            return newLayout.findIndex(itemLayout => itemLayout.i === item.i) > -1;
        })

        let needUpdate = false;
        if (DIYDatasTemp.length !== DIYDatas.length) {
            needUpdate = true;
        }

        // 如果存在DIYData， 则表示是新增
        if (newDIYData) {
            needUpdate = true;
            const DIYIndex = DIYDatasTemp.findIndex(item => item.i === newDIYData.i);
            if (DIYIndex > -1) {
                DIYDatasTemp[DIYIndex] = newDIYData;
            } else {
                DIYDatasTemp.push(newDIYData);
            }
        }

        if (needUpdate) {
            saveNewDIYDatas(DIYDatasTemp);
        }       
        
        const res = await setKv(token, 'spaceLayout', JSON.stringify(newLayout));
        return res;
    }

    /***
     * API - 更新DIY数据到服务器
    */
     async function saveNewDIYDatas(newDIYDatas: DIYCom[]) {
        setDIYDatas(newDIYDatas);
        
        const res = await setKv(token, 'DIYDatas', JSON.stringify(newDIYDatas));
        return res;
    }

    // 用户编辑DIY数据并保存
    async function updateDIYDatasByUser(i: string, newDIYData: DIYData, w: number) {
        const DIYDatasTemp = [...DIYDatas];
        const DIYIndex = DIYDatasTemp.findIndex((item) => item.i === i);
        if (DIYIndex > -1) {
            DIYDatasTemp[DIYIndex].DIYData = newDIYData;
            await saveNewDIYDatas(DIYDatasTemp);

            const layoutTemp = [...layout];
            const layoutIndex = layoutTemp.findIndex(item => item.i === i);
            if (layoutIndex > -1) {
                layoutTemp[layoutIndex] = { ...layoutTemp[layoutIndex], w };
            }
            await saveNewLayout(layoutTemp);

            return {type: true, msg: 'success', i};
        }
        return {type: false, msg: 'fail', i};
    }



    // 恢复到默认布局
    async function resetLayout() {
        delKv(token, 'spaceLayout');
        setLayout(layoutDefault);
        updateMaterialByLayout(layoutDefault);
    }
    
    // 初始化 从接口中获取保存的布局，如果没有则取默认布局
    useEffect(() => {
        async function init() {
            const layoutJSON = await getPriceLayout(account);
            const DIYJSON = await getDIYDatas(account);
            if (layoutJSON) {
                const ItemA = layoutJSON.find((item: any) => item.i === 'a');
                if (ItemA) {
                    ItemA.static = true;
                }
                setLayout(layoutJSON);
                setPrevLayout(layoutJSON);
                updateMaterialByLayout(layoutJSON);
                setDone(true);
            }
            if (DIYJSON) {
                setDIYDatas(DIYJSON);
            }
        }
        if (account) {
            setDone(false);
            init();
        }
    }, [account]);

    // 根据当前布局更新物料状态 只是更新isUsed
    function updateMaterialByLayout(nowLayouts: Layout[]) {
        //console.log('开始更新mmmm:', nowLayouts);
        const materialTemp = [...material];

        for (let i = 0; i < materialTemp.length; i++){
            const m = materialTemp[i];
            m.isUsed = nowLayouts.findIndex((item) => {
                return item.i === m.i;
            }) > -1;
        }

        for (let i = 0; i < nowLayouts.length; i++){
            const n = nowLayouts[i];
            const isHave = materialTemp.findIndex(item => item.i === n.i);
            if (isHave < 0) {
                materialTemp.push({ i: n.i, isUsed: true, t: '', w: n.w, isDIY: /^diy[\d|-]/.test(n.i), isDIY2: /^diyp-/.test(n.i) });
            }
        }
        //console.log('开始更新mmmm:2', materialTemp);
        setMaterial(materialTemp);
    }

    // 批量添加块
    function addLayout(ids: string[]) {
        // 添加到第0列最下面
        const maxY = layout.reduce((res, item) => {
            return item.y > res ? item.y : res;
        }, 0) + 1;

        // 找到这个物料的信息
        const materialTemp = [];
        for (let i = 0; i < ids.length; i++){
            const item = materialDefault.find(item => item.i === ids[i]);
            if (item) {
                materialTemp.push({i:item.i, x: 0,y: maxY, w: item.w, h:1});
            };
        }
        const newLayout = [...layout, ...materialTemp];
        setLayout(newLayout);
        updateMaterialByLayout(newLayout);
    }

    // 删除块
    function removeLayout(i: string) {
        const newLayout = _.reject(layout, { i });
        setLayout([...newLayout]);
        updateMaterialByLayout(newLayout);
    }

    
    // 恢复到上一次的布局
    function restoreLayout() {
        setLayout([...prevLayout]);
        updateMaterialByLayout(prevLayout);
    }

    // 新建一个自定义块 diy1.0
    async function addLayoutDIY(name: string, size: string, detail?: string) {
        // 检查是否达到最大数量
        const diyNum = material.filter((item) => item.isDIY).length;
        //console.log('material没更新吗：', material);
        if (diyNum >= 10) {
            return {type: false, msg: "Can't build more"};
        }

        // 根据用户token和时间戳生成一个ID
        const id = `diy-${account}-${Date.now()}`;

        // 更新material
        const materialTemp = [...material];
        let w = 2;
        switch (size) {
            case 'small': w = 2; break;
            case 'medium': w = 4; break;
            case 'large': w = 6;
        }
        materialTemp.push({ i: id, isUsed: true, t: name, w, isDIY: true });
        setMaterial(materialTemp);


        // 更新布局
        const layoutTemp = [...layout];
        const maxY = layout.reduce((res, item) => {
            return item.y > res ? item.y : res;
        }, 0) + 1;

        layoutTemp.push({ i: id, x: 0, y: maxY, w, h: 1 }); // DIYData: {name, detail: null}

        const newDIYData = { i: id, DIYData: { name, detail: detail || null } };

        const res = await saveNewLayout(layoutTemp, newDIYData);

        if (res) {
            return { type: true, msg: 'success', i: id };
        } else {
            return { type: false, msg: 'error', i: id };
        }
       
    }

        /**
         * 新建一个自定义块 diy2.0
         * detail包含type,url, srcDoc等所有信息
        */
        async function addLayoutDIY2(name: string, size: string, detail: any, sourceUrl: string) {
    
            // 根据用户token和时间戳生成一个ID
            const id = `diyp-${account}-${Date.now()}`;
    
            // 更新material
            const materialTemp = [...material];
            let w = 2;
            switch (size) {
                case 'small': w = 2; break;
                case 'medium': w = 4; break;
                case 'large': w = 6;
            }
            materialTemp.push({ i: id, isUsed: true, t: name, w, isDIY2: true });
            setMaterial(materialTemp);
    
    
            // 更新布局
            const layoutTemp = [...layout];
            const maxY = layout.reduce((res, item) => {
                return item.y > res ? item.y : res;
            }, 0) + 1;
    
            layoutTemp.push({ i: id, x: 0, y: maxY, w, h: 1 }); // DIYData: {name, detail: null}
    
            const newDIYData = { i: id, DIYData: { name, detail, sourceUrl } };
    
            const res = await saveNewLayout(layoutTemp, newDIYData);
            if (res) {
                return { type: true, msg: 'success', i: id };
            } else {
                return { type: false, msg: 'error', i: id };
            }
    }
    
    function editDIY2(id: string, sourceData: any, w: number) {
        dispatch({
            type: 'app/saveDIY2Info',
            payload: !id ? null : {id, sourceData, w}
        });
    }

    const DIY2Info = useSelector((state: RootState) => state.app.DIY2Info);

    return {
        layout,
        prevLayout,
        material,
        isDone,
        DIYDatas,
        DIY2Info,
        setLayout,
        setPrevLayout,
        saveNewLayout,
        restoreLayout,
        addLayout,
        removeLayout,
        resetLayout,
        addLayoutDIY,
        updateDIYDatasByUser,
        addLayoutDIY2,
        editDIY2,
    }
}