import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
// import { listsService } from '../services/ListsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAllBoards(req, res, next) {
    try {
      return res.send(await boardsService.findBoard({ creatorId: req.userInfo.id }))
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.createBoard(req.body)
      res.send(await boardsService.findBoardById(board.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      res.send(await boardsService.deleteBoard(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
