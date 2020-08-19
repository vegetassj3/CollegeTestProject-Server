import { Request, Response, Router } from "express";

import test from "../models/test/test.model";

let router = Router();
const secretKey = process.env.secretKey;

router.get("/getAllTest", async (req: Request, res: Response) => {
  test
    .find()
    .then((tests) => {
      let result: any = {};
      for (let i = 0; i < tests.length; i++) {
        let _id = tests[i]._id;
        result[_id] = tests[i];
      }
      res.send(result).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.post("/createTest", async (req: Request, res: Response) => {
  const _id = req.body._id;
  const testName = req.body.testName;
  const testObject = {
    _id: _id,
    testData: {
      testName: testName,
      questions: {},
    },
  };

  new test(testObject)
    .save()
    .then((result) => {
      let sendData: any = { testData: {}, message: "success" };
      sendData["testData"][_id] = result;
      console.log(sendData);
      res.send(sendData);
    })
    .catch((e) => {
      res.send(e).status(500);
    });
});

router.post("/saveTest", async (req: Request, res: Response) => {
  const _id = req.body._id;
  const testName = req.body.testName;
  let questions = req.body.questions;
  const testObject = {
    _id: _id,
    testData: {
      testName: testName,
      questions: questions,
    },
  };
  test
    .findOneAndUpdate({ _id: _id }, testObject)
    .then((result) => {
      res.send({ message: "success" }).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.post("/deleteTest", async (req: Request, res: Response) => {
  const _id = req.body._id;
  test
    .findByIdAndDelete({ _id })
    .then((result) => {
      res.send({ message: "success" }).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});
export default router;
