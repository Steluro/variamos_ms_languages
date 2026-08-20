// This file is considered deprecated.
// However, nothing can replace it as of yet, so we need it

import Ajv from "ajv";
import { Request, Response } from "express";
import { RequestApiSchema } from "./old.request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "./old.response";
import {
  ExternalFunction,
  ExternalFunctionSchema,
  OrmExternalFunction,
} from "../models/old.externalFunction.model";

const ajv = new Ajv();

export default class ExternalFunctionManagement {
  getExternalFuntions = async (req: Request, res: Response) => {
    try {
      const languageId = Array.isArray(req.params.languageId)
        ? req.params.languageId[0]
        : req.params.languageId;

      const searchExternalFunctions =
        (await OrmExternalFunction.findAll({
          where: { language_id: languageId },
        })) as ExternalFunction[];

      const responseApi = new ResponseAPISuccess();

      responseApi.message =
        "External functions were found successfully";

      responseApi.data = JSON.parse(
        JSON.stringify(searchExternalFunctions),
      );

      responseApi.transactionId = "getExternalFuntions_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();

      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "08";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}'),
      );
      responseApi.transactionId = "getExternalFuntions_";

      console.log(JSON.stringify(responseApi));

      return res.status(500).json(responseApi);
    }
  };

  createExternalFunction = async (req: Request, res: Response) => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors),
        );

      let extFunction: ExternalFunction = new ExternalFunction();
      extFunction = Object.assign(extFunction, req.body.data);

      validate = ajv.compile(ExternalFunctionSchema);
      valid = validate(req.body.data);

      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors),
        );

  
        extFunction.language_id = Array.isArray(req.params.languageId,)
          ? req.params.languageId[0]
          : req.params.languageId;

      let newExFunction = await OrmExternalFunction.create(extFunction, {
        fields: [
          "name",
          "label",
          "url",
          "header",
          "resulting_action",
          "language_id",
          "visible",
          "call_on_properties_changed",
        ],
      });

      if (newExFunction) {
        const responseApi = new ResponseAPISuccess();
        responseApi.message = "External function created successfully";
        responseApi.data = JSON.parse(JSON.stringify(extFunction));
        responseApi.transactionId = "createExternalFunction_";

        return res.status(200).json(responseApi);
      }
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "10";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}'),
      );
      responseApi.transactionId = "createExternalFunction_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  updateExternalFunction = async (req: Request, res: Response) => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors),
        );

      let extFunction: ExternalFunction = new ExternalFunction();
      extFunction = Object.assign(extFunction, req.body.data);
      extFunction.id = Array.isArray(req.params.exid)
        ? req.params.exid[0]
        : req.params.exid;

      validate = ajv.compile(ExternalFunctionSchema);
      valid = validate(req.body.data);

      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors),
        );

      let newExFunction = await OrmExternalFunction.update(
        {
          name: extFunction.name,
          label: extFunction.label,
          url: extFunction.url,
          header: extFunction.header,
          resulting_action: extFunction.resulting_action,
          language_id: extFunction.language_id,
          visible: extFunction.visible,
          call_on_properties_changed: extFunction.call_on_properties_changed,
        },
        {
          where: { id: extFunction.id },
        },
      );

      if (newExFunction.toString() === "0")
        throw new Error("Something wrong, External function not found.");

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "External function updated successfully";
      responseApi.data = JSON.parse(JSON.stringify(extFunction));
      responseApi.transactionId = "updateExternalFunction_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "02";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}'),
      );
      responseApi.transactionId = "updateExternalFunction_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  deleteExternalFunction = async (req: Request, res: Response) => {
    try {

      const deleteExternalFunction = await OrmExternalFunction.destroy({
        where: { id: req.params.exid },
      });

      if (deleteExternalFunction) {
        const responseApi = new ResponseAPISuccess();
        responseApi.message = "External function deleted successfully";
        responseApi.transactionId = "deleteExternalFUnction_";

        return res.status(200).json(responseApi);
      }
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "15";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}'),
      );
      responseApi.transactionId = "deleteExternalFUnction";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
