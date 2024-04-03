import express from 'express';
import  {createLeaderboards,addUserToLeaderboard,updateUserScore,deleteLeaderboard,getLeaderboard,getUserRank,getUserNearestRank} from '../../controllers/leaderboards/leaderboards';

const router = express.Router();
router.post('/create', createLeaderboards);
router.delete('/delete', deleteLeaderboard);
router.patch('/addUser', addUserToLeaderboard);
router.patch('/updatescore/:idLeaderboard/:idUser', updateUserScore);
router.get('/middle/:idLeaderboard/:size/', getUserNearestRank);
router.get('/:idLeaderboard/:idUser', getUserRank);
router.get('/:idLeaderboard/:size/:page', getLeaderboard);

export default router;