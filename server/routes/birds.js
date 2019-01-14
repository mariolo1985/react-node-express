import express from 'express';

const router = express.Router();

// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// homepage route
router.get('/', (req, res) => {
    res.send('Birds home page');
});

router.get('/about', (req, res) => {
    res.send('about birds');
});

export { router as birdsRoute };
