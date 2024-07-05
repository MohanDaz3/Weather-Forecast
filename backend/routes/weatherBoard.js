const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", authorize, async (req, res) => {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        name: true, 
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
