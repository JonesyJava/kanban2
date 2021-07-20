import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
// import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllLists)
      .get('/:id', this.getListById)
      // .get('/:id/tasks', this.getTasksByListId)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
      .put('/:id', this.editList)
  }

  // async getTasksByListId(req, res, next) {
  //   try {
  //     res.send(await tasksService.find({ list: req.params.id }))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getListById(req, res, next) {
    try {
      return res.send(await listsService.findListById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getAllLists(req, res, next) {
    try {
      return res.send(await listsService.findList())
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const list = await listsService.createList(req.body)
      res.send(await listsService.findListById(list._id))
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      res.send(await listsService.deleteList(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      res.send(await listsService.editList(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
