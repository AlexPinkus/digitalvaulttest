import express from 'express';
import  {createLeaderboards,addUserToLeaderboard,updateUserScore,deleteLeaderboard,getLeaderboard,getUserRank,getUserNearestRank} from '../../controllers/leaderboards/leaderboards';

const router = express.Router();
// Follo REST conventions, no need to add the verb.
router.post('', createLeaderboards);
router.delete('', deleteLeaderboard);

// To add users I'd use a put, if the resource doesn't exists it creates it.
router.put('/:idLeaderboard/users', addUserToLeaderboard);
// When accessing a nested resource you need to use the correct format:
router.patch('/:idLeaderboard/users/:idUser', updateUserScore);
router.get('/middle/:idLeaderboard/:size/', getUserNearestRank);

// When accessing a nested resource you need to use the correct format:
router.get('/:idLeaderboard/users/:idUser', getUserRank);
// size and page should be handled as query params not path params
router.get('/:idLeaderboard', getLeaderboard);

export default router;
