import { Router } from "express";
import { PagedModel } from "../Domain/Core/Entities/PagedModel";
import { RequestModel } from "../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../Domain/Core/Entities/ResponseModel";
import { LanguageFilter } from "../Domain/Language/Entities/LanguageFilter";
import { SemanticsFilter } from "../Domain/Language/Entities/SemanticFilter";
import { LanguageUseCase } from "../Domain/Language/LanguageUseCase";
import { isAuthenticated } from "@variamosple/variamos-security";

export const LANGUAGES_V2_ROUTE = "/v2/languages";

const languagesV2Router = Router();

async function queryLanguagesRepository(
  transactionId: string,
  name: string | null,
  userId: string | null,
  stateAccept: string | null,
  pageNumber: number,
  pageSize: number,
  withDelete: boolean,
  res: any,
) {
  try {
    const filter: LanguageFilter = LanguageFilter.builder()
      .setName(name as string)
      .setUserId(userId as string)
      .setStatus(stateAccept as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .build();

    const request = new RequestModel<LanguageFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguages(
      request,
      withDelete,
    );

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
}

languagesV2Router.get("/", isAuthenticated, async (req, res) => {
  const transactionId = "getLanguages";
  const { pageNumber, pageSize, name = null } = req.query;

  queryLanguagesRepository(
    transactionId,
    name as string,
    null,
    null,
    pageNumber as unknown as number,
    pageSize as unknown as number,
    true,
    res,
  );
});

languagesV2Router.get("/public", isAuthenticated, async (req, res) => {
  const transactionId = "getPublicLanguages";
  const userId = req.user?.id;
  const { pageNumber, pageSize, name = null } = req.query;
  try {
    const filter: LanguageFilter = LanguageFilter.builder()
      .setName(name as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .setUserId(userId as string)
      .build();

    const request = new RequestModel<LanguageFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getPublicLanguages(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/deleted", isAuthenticated, async (req, res) => {
  const transactionId = "getDeletedLanguages";
  const userId = req.user?.id;
  const { pageNumber, pageSize, name = null } = req.query;
  try {
    const filter: LanguageFilter = LanguageFilter.builder()
      .setName(name as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .setUserId(userId as string)
      .build();

    const request = new RequestModel<LanguageFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getDeletedLanguages(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/pending", isAuthenticated, async (req, res) => {
  const transactionId = "getPendingLanguages";
  const userId = req.user?.id;
  const { pageNumber, pageSize, name = null } = req.query;
  try {
    const filter: LanguageFilter = LanguageFilter.builder()
      .setName(name as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .setUserId(userId as string)
      .build();

    const request = new RequestModel<LanguageFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getPendingLanguages(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/elements/draws", async (req, res) => {
  const transactionId = "getLanguageElementsDraws";
  const { pageNumber = null, pageSize = null } = req.query;
  try {
    const filter: PagedModel = new PagedModel(
      parseInt(pageNumber as string) || undefined,
      parseInt(pageSize as string) || undefined,
    );

    const request = new RequestModel<PagedModel>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguageElementsDraw(
      request,
    );

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/semantics", async (req, res) => {
  const transactionId = "getLanguageSemantics";
  const { pageNumber = null, pageSize = null, search = null } = req.query;
  try {
    const filter: SemanticsFilter = SemanticsFilter.builder()
      .setSearchValue(search as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .build();

    const request = new RequestModel<SemanticsFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguageSemantics(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error",
    );
    res.status(500).json(response);
  }
});

export default languagesV2Router;
