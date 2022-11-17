import { Request, Response, NextFunction } from "express";
import { IBaseController } from "./types/IBaseController";

export default class AuthController implements IBaseController {
    index: (req, res) => void;
    show: (req, res) => void;
    store: (req, res) => void;
    update: (req, res) => void;
    destroy: (req, res) => void;
}