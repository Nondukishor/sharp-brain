import {Request,Response, NextFunction} from "express"
export interface IPrams{
    req:Request;
    res:Response;
    next?: NextFunction;
}
export interface IBaseController{
  index:(props:IPrams) =>void;
  show:(props:IPrams) =>void;
  store:(props:IPrams) =>void;
  update:(props:IPrams) =>void;
  destroy:(props:IPrams) =>void;
}