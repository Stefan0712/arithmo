import { Snowflake, Heart, FastForward, Zap, MessageCircleQuestionMark, Plus } from 'lucide-react';
import { ITEM_CATALOG } from '../../lib/store/store';
import type { CatalogItem } from '../../types/store';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { useMemo } from 'react';

interface ItemsBarProps {
    freezeTime: ()=>void;
    addLife: ()=>void;
    skip: ()=> void;
}

const ItemsBar: React.FC<ItemsBarProps> = ({freezeTime, addLife, skip}) => {

const rawInventory = useLiveQuery(() => db.inventory.toArray());

    const itemCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        
        // If it's loaded, populate the counts
        if (rawInventory) {
            rawInventory.forEach((item) => {
                if (!item.isUsed) {
                    counts[item.itemId] = (counts[item.itemId] || 0) + 1;
                }
            });
        }
        
        // Always return the object, so it's never 'undefined'
        return counts; 
    }, [rawInventory]);

    const gameItems = ITEM_CATALOG.filter(
        item => item.id === 'item_freeze' || item.id === 'item_skip' || item.id === 'item_life'
    );

    const handleActivateItem = (item: CatalogItem) => {
        if (item.id==='item_freeze') {
            freezeTime()
        }
        console.log(item.id);
    }
    
    return (
        <div className="w-full h-[70px] bg-surface shadow-[0_4px_0_0_rgba(0,0,0,0.3)] flex items-center gap-2 px-2">
            {gameItems.map(item=> <Item itemCounts={itemCounts[item.id]} item={item} handleClick={()=>handleActivateItem(item)} />)}
            <button className='ml-auto text-white border border-white/10 flex items-center justify-center rounded-full size-[50px]'>
                <Plus />
            </button>
        </div>
    )
}

export default ItemsBar;

const Item = ({item, itemCounts, handleClick}: {item: CatalogItem, itemCounts: number, handleClick: ()=>void}) => {

    const getItemIcon = (icon: string) => {
        switch(icon) {
            case 'snowflake':
                return <Snowflake />
            case 'heart':
                return <Heart />
            case 'fast-forward':
                return <FastForward />
            case 'zap':
                return <Zap />
            default:
                return <MessageCircleQuestionMark />
        }
    }

    return (
        <div 
            onClick={handleClick}
            className={`px-2 p-1 h-[50px] rounded flex gap-2 items-center justify-center ${item.bgColor} ${item.color}`}
        >
            {getItemIcon(item.icon)}
            <b>{itemCounts}</b>
        </div>
    )
}