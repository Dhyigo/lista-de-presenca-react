import { memo } from 'react';
import './style.css';

export type CardProps = {
    name: string;
    time: string;
};

export const Card = memo(({name, time}: CardProps) => {
    return (
        <div className="card">
            <strong>{name}</strong>
            <small>{time}</small>
        </div>
    );
});
