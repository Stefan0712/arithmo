import { Snowflake, Heart, FastForward, Zap, MessageCircleQuestionMark, Plus } from 'lucide-react';
import { ITEM_CATALOG } from '../../lib/store/store';
import type { CatalogItem } from '../../types/store';

const ItemsBar = () => {

   
    
    return (
        <div className="w-full h-[70px] bg-surface shadow-[0_4px_0_0_rgba(0,0,0,0.3)] flex items-center gap-2 px-2">
            {ITEM_CATALOG.map(item=> <Item item={item} />)}
            <button className='ml-auto text-white border border-white/10 flex items-center justify-center rounded-full size-[50px]'>
                <Plus />
            </button>
        </div>
    )
}

export default ItemsBar;

const Item = ({item}: {item: CatalogItem}) => {

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
        <div className={`px-2 p-1 h-[50px] rounded flex gap-2 items-center justify-center ${item.bgColor} ${item.color}`}>
            {getItemIcon(item.icon)}
            <b>{item.owned}</b>
        </div>
    )
}