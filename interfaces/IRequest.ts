import { Request, RequestParamHandler } from "express";
import { ObjectId } from "mongoose";

export default interface IRequest extends Request {
    id: ObjectId;   
}