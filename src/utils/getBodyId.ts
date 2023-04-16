import { Body } from 'matter-js';

export const getBodyId = (body: Body) => body.label ?? body.id;
