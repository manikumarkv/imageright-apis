import axios, { AxiosInstance } from "axios";
import { getAccount, getAccountGroups, getAllAccounts, getCurrentUserAccount, getCurrentUserGroups } from "./api/accounts";
import { getAttributeById, getAttributeByName, getAttributeByObject } from "./api/attributes";
import { authenticate, AuthResponse } from "./api/authentication";
import { createBatch } from "./api/batches";
import { getContainers } from "./api/containers";
import { createDocument, findDocuments, getDocumentById, moveDocumentV2, moveDocument, updateProperties, copyDocument, deleteDocument } from "./api/documents";
import { getDrawers, getDrawerById, getDrawerByName, getDrawersInContainer, getDrawersInContainerByName } from "./api/drawers";
import { createFile, findFiles, getFileById, mergeFiles } from "./api/files";
import { createFolder, findFolders, getFolderById } from "./api/folders";
import { getAllowedTypes, getAllowedTypesForContainer, getAttributeDefinitionsForType, getFileTypeExtensions, getFileTypeTemplate, getObjectType, getSortOptionsForType, getTypesForClass } from "./api/objecttypes";
import { checkReadPermissions, copyPage, createPage, createPageV2, getAllPagesFromDocument, getPageById, getPageImageMetadata, lockPage, mergeToDocument, movePage, movePageV2, rotatePage, unlockPage, updatePageContent, updatePageContentV2, updatePageProperties } from "./api/pages";
import { createTask, getPostTasks, getTaskAttributeById, getTaskAttributeByName, getTaskAttributes, getTasks, getTasksByFileId, getTasksByFileIdPost, killTask, lockTask, refreshTaskLock, releaseTask, releaseTaskByAnchor, releaseTaskSplitStep, routeTask, setTaskAttributeById, setTaskAttributeByName, unlockTask, updateTask } from "./api/tasks";
import { changeUserPassword, getCurrentUser, getCurrentUserData, getUserData } from "./api/users";
import { getDefaultStepLink, getPriorityList, getSplitLinkParameters, getStepAttributeById, getStepAttributeByName, getStepAttributes, getStepLinks, getSteps, getUsersToAssign, getWorkflows } from "./api/workflows";
import { getImageById, getImageByIdV2 } from "./api/images";

const VERSION = '7.2.1150';

class ImageRight {
  private version: string;
  private baseUrl: string;
  private AccessToken: string;

  constructor(baseUrl: string, AccessToken: string) {
    this.version = VERSION;
    this.baseUrl = baseUrl;
    this.AccessToken = AccessToken;
  }

  private api(): AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      headers: { Authorization: `AccessToken ${this.AccessToken}` },
    });
  }

  // Accounts
  getAccount(accountId: string, type: string): Promise<any> {
    return getAccount(this.api(), accountId, type);
  }

  getAccountGroups(accountId: string): Promise<any> {
    return getAccountGroups(this.api(), accountId);
  }

  getAllAccounts(): Promise<any> {
    return getAllAccounts(this.api());
  }

  getCurrentUserAccount(): Promise<any> {
    return getCurrentUserAccount(this.api());
  }

  getCurrentUserGroups(): Promise<any> {
    return getCurrentUserGroups(this.api());
  }

  // Attributes
  getAttributeById(objId: string, attId: string): Promise<any> {
    return getAttributeById(this.api(), objId, attId);
  }

  getAttributeByName(objId: string, attName: string): Promise<any> {
    return getAttributeByName(this.api(), objId, attName);
  }

  getAttributeByObject(objId: string): Promise<any> {
    return getAttributeByObject(this.api(), objId);
  }

  // Authentication
  authenticate(UserName: string, Password: string): Promise<string> {
    return authenticate(this.baseUrl, UserName, Password).then((accessToken: AuthResponse) => {
      this.AccessToken = accessToken.AccessToken;
      return accessToken.AccessToken;
    });
  }

  // Batches
  createBatch(batch: any): Promise<any> {
    return createBatch(this.api(), batch);
  }

  // Containers
  getContainers(containerId: string, recursive: boolean): Promise<any> {
    return getContainers(this.api(), containerId, recursive);
  }

  // Documents
  createDocument(doc: any): Promise<any> {
    return createDocument(this.api(), doc);
  }

  findDocuments(search: any): Promise<any> {
    return findDocuments(this.api(), search);
  }

  getDocumentById(docId: string): Promise<any> {
    return getDocumentById(this.api(), docId);
  }

  moveDocument(move: any, ver: number = 2): Promise<any> {
    if (ver === 2) return moveDocumentV2(this.api(), move);
    return moveDocument(this.api(), move);
  }

  updateProperties(docId: string, props: any): Promise<any> {
    return updateProperties(this.api(), docId, props);
  }

  copyDocument(copy: any): Promise<any> {
    return copyDocument(this.api(), copy);
  }

  deleteDocument(docId: string, force: boolean): Promise<any> {
    return deleteDocument(this.api(), docId, force);
  }

  // Drawers
  getDrawers(): Promise<any> {
    return getDrawers(this.api());
  }

  getDrawerById(id: string): Promise<any> {
    return getDrawerById(this.api(), id);
  }

  getDrawerByName(name: string): Promise<any> {
    return getDrawerByName(this.api(), name);
  }

  getDrawersInContainer(containerId: string): Promise<any> {
    return getDrawersInContainer(this.api(), containerId);
  }

  getDrawersInContainerByName(containerId: string, name: string): Promise<any> {
    return getDrawersInContainerByName(this.api(), containerId, name);
  }

  // Files
  createFile(file: any): Promise<any> {
    return createFile(this.api(), file);
  }

  findFiles(search: any): Promise<any> {
    return findFiles(this.api(), search);
  }

  getFileById(fileId: string, includeHasNotes: boolean): Promise<any> {
    return getFileById(this.api(), fileId, includeHasNotes);
  }

  mergeFiles(sourceId: string, targetId: string): Promise<any> {
    return mergeFiles(this.api(), sourceId, targetId);
  }

  // Folders
  createFolder(folder: any): Promise<any> {
    return createFolder(this.api(), folder);
  }

  findFolders(search: any): Promise<any> {
    return findFolders(this.api(), search);
  }

  getFolderById(folderId: string, includeHasNotes: boolean): Promise<any> {
    return getFolderById(this.api(), folderId, includeHasNotes);
  }

  // Images
  getImageById(imageId: string, version: number): Promise<any> {
    return getImageById(this.api(), imageId, version);
  }

  getImageByIdV2(pageId: string, imageId: string, version: number): Promise<any> {
    return getImageByIdV2(this.api(), pageId, imageId, version);
  }


  // ObjectTypes
  getAllowedTypes(typeId: string): Promise<any> {
    return getAllowedTypes(this.api(), typeId);
  }

  getAllowedTypesForContainer(objectId: string): Promise<any> {
    return getAllowedTypesForContainer(this.api(), objectId);
  }

  getAttributeDefinitionsForType(objectTypeId: string): Promise<any> {
    return getAttributeDefinitionsForType(this.api(), objectTypeId);
  }

  getFileTypeExtensions(fileTypeId: string): Promise<any> {
    return getFileTypeExtensions(this.api(), fileTypeId);
  }

  getFileTypeTemplate(fileTypeId: string): Promise<any> {
    return getFileTypeTemplate(this.api(), fileTypeId);
  }

  getObjectType(objectTypeId: string): Promise<any> {
    return getObjectType(this.api(), objectTypeId);
  }

  getSortOptionsForType(objectTypeId: string): Promise<any> {
    return getSortOptionsForType(this.api(), objectTypeId);
  }

  getTypesForClass(standardObjectClass: string): Promise<any> {
    return getTypesForClass(this.api(), standardObjectClass);
  }

  // Pages
  checkReadPermissions(pageId: string): Promise<any> {
    return checkReadPermissions(this.api(), pageId);
  }

  createPage(page: any): Promise<any> {
    return createPage(this.api(), page);
  }

  getAllPagesFromDocument(docId: string): Promise<any> {
    return getAllPagesFromDocument(this.api(), docId);
  }

  getPageById(pageId: string): Promise<any> {
    return getPageById(this.api(), pageId);
  }

  getPageImageMetadata(pageId: string): Promise<any> {
    return getPageImageMetadata(this.api(), pageId);
  }

  lockPage(pageId: string): Promise<any> {
    return lockPage(this.api(), pageId);
  }

  movePage(moveObj: any): Promise<any> {
    return movePage(this.api(), moveObj);
  }

  rotatePage(pageId: string, rotationAngle: number): Promise<any> {
    return rotatePage(this.api(), pageId, rotationAngle);
  }

  unlockPage(pageId: string): Promise<any> {
    return unlockPage(this.api(), pageId);
  }

  updatePageContent(pageId: string, content: any): Promise<any> {
    return updatePageContent(this.api(), pageId, content);
  }

  updatePageProperties(pageId: string, properties: any): Promise<any> {
    return updatePageProperties(this.api(), pageId, properties);
  }

  // V2 Pages
  copyPage(copyObj: any): Promise<any> {
    return copyPage(this.api(), copyObj);
  }

  createPageV2(page: any, targetPageId: string, before: boolean): Promise<any> {
    //@ts-ignore
    //TODO: Fix this
    return createPageV2(this.api(), page, targetPageId, before);
  }

  mergeToDocument(mergeObj: any): Promise<any> {
    return mergeToDocument(this.api(), mergeObj);
  }

  movePageV2(moveObj: any): Promise<any> {
    return movePageV2(this.api(), moveObj);
  }

  updatePageContentV2(pageId: string, content: any): Promise<any> {
    return updatePageContentV2(this.api(), pageId, content);
  }

  // Tasks Actions
  killTask(taskId: string): Promise<any> {
    return killTask(this.api(), taskId);
  }

  lockTask(taskId: string, options: any): Promise<any> {
    return lockTask(this.api(), taskId, options);
  }

  refreshTaskLock(taskId: string): Promise<any> {
    return refreshTaskLock(this.api(), taskId);
  }

  releaseTask(taskId: string, options: any): Promise<any> {
    return releaseTask(this.api(), taskId, options);
  }

  releaseTaskByAnchor(taskId: string, anchor: string, options: any): Promise<any> {
    return releaseTaskByAnchor(this.api(), taskId, anchor, options);
  }

  releaseTaskSplitStep(taskId: string, options: any): Promise<any> {
    return releaseTaskSplitStep(this.api(), taskId, options);
  }

  routeTask(taskId: string, options: any): Promise<any> {
    return routeTask(this.api(), taskId, options);
  }

  unlockTask(taskId: string): Promise<any> {
    return unlockTask(this.api(), taskId);
  }

  // Task Attributes
  getTaskAttributeById(taskId: string, id: string): Promise<any> {
    return getTaskAttributeById(this.api(), taskId, id);
  }

  getTaskAttributeByName(taskId: string, name: string): Promise<any> {
    return getTaskAttributeByName(this.api(), taskId, name);
  }

  getTaskAttributes(taskId: string): Promise<any> {
    return getTaskAttributes(this.api(), taskId);
  }

  setTaskAttributeById(taskId: string, id: string, content: any): Promise<any> {
    return setTaskAttributeById(this.api(), taskId, id, content);
  }

  setTaskAttributeByName(taskId: string, name: string, content: any): Promise<any> {
    return setTaskAttributeByName(this.api(), taskId, name, content);
  }

  // Tasks
  createTask(content: any): Promise<any> {
    return createTask(this.api(), content);
  }

  getPostTasks(options: any): Promise<any> {
    return getPostTasks(this.api(), options);
  }

  getTasks(options: any): Promise<any> {
    return getTasks(this.api(), options);
  }

  getTasksByFileId(fileId: string, options: any): Promise<any> {
    return getTasksByFileId(this.api(), fileId, options);
  }

  getTasksByFileIdPost(fileId: string, options: any): Promise<any> {
    return getTasksByFileIdPost(this.api(), fileId, options);
  }

  updateTask(taskId: string, content: any): Promise<any> {
    return updateTask(this.api(), taskId, content);
  }

  // Users
  changeUserPassword(content: any): Promise<any> {
    return changeUserPassword(this.api(), content);
  }

  getCurrentUser(): Promise<any> {
    return getCurrentUser(this.api());
  }

  getCurrentUserData(): Promise<any> {
    return getCurrentUserData(this.api());
  }

  getUserData(userId: string): Promise<any> {
    return getUserData(this.api(), userId);
  }

  // Workflows
  getDefaultStepLink(stepId: string, options: any): Promise<any> {
    return getDefaultStepLink(this.api(), stepId, options);
  }

  getPriorityList(stepId: string): Promise<any> {
    return getPriorityList(this.api(), stepId);
  }

  getSplitLinkParameters(stepId: string, options: any): Promise<any> {
    return getSplitLinkParameters(this.api(), stepId, options);
  }

  getStepAttributeById(stepId: string, id: string): Promise<any> {
    return getStepAttributeById(this.api(), stepId, id);
  }

  getStepAttributeByName(stepId: string, name: string): Promise<any> {
    return getStepAttributeByName(this.api(), stepId, name);
  }

  getStepAttributes(stepId: string): Promise<any> {
    return getStepAttributes(this.api(), stepId);
  }

  getStepLinks(srcStepId: string, options: any): Promise<any> {
    return getStepLinks(this.api(), srcStepId, options);
  }

  getSteps(flowId: string, options: any): Promise<any> {
    return getSteps(this.api(), flowId, options);
  }

  getUsersToAssign(stepId: string): Promise<any> {
    return getUsersToAssign(this.api(), stepId);
  }

  getWorkflows(options: any): Promise<any> {
    return getWorkflows(this.api(), options);
  }
}

export default ImageRight;