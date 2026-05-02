import Menu from "../models/menu.model.js";

// Get all menu items
export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find().sort({ createdAt: 1 });

    const daysOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
    const menuMap = new Map(menu.map((item) => [item.day, item]));

    const completeMenu = daysOrder.map((day) => {
      if (menuMap.has(day)) {
        return menuMap.get(day);
      }
      return {
        day,
        meal: { en: "", ar: "", fr: "" },
        isActive: true,
        _id: null,
      };
    });

    res.status(200).json({
      success: true,
      menu: completeMenu,
    });
  } catch (error) {
    console.error("Get menu error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { day } = req.params;
    const { mealEn, mealAr, mealFr, isActive } = req.body;

    if (!mealEn || !mealAr || !mealFr) {
      return res.status(400).json({
        success: false,
        message: "All language fields (English, Arabic, French) are required",
      });
    }

    let menuItem = await Menu.findOne({ day });

    if (menuItem) {
      menuItem.meal = { en: mealEn, ar: mealAr, fr: mealFr };
      if (isActive !== undefined) menuItem.isActive = isActive;
      await menuItem.save();
    } else {
      menuItem = await Menu.create({
        day,
        meal: { en: mealEn, ar: mealAr, fr: mealFr },
        isActive: isActive !== undefined ? isActive : true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menuItem,
    });
  } catch (error) {
    console.error("Update menu error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update menu",
      error: error.message,
    });
  }
};

// Update multiple menu items at once
export const updateMultipleMenu = async (req, res) => {
  try {
    const { menuItems } = req.body;

    if (!menuItems || !Array.isArray(menuItems)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu items data",
      });
    }

    const updates = [];
    for (const item of menuItems) {
      const { day, mealEn, mealAr, mealFr, isActive } = item;

      if (!mealEn || !mealAr || !mealFr) {
        continue;
      }

      let menuItem = await Menu.findOne({ day });

      if (menuItem) {
        menuItem.meal = { en: mealEn, ar: mealAr, fr: mealFr };
        if (isActive !== undefined) menuItem.isActive = isActive;
        await menuItem.save();
      } else {
        menuItem = await Menu.create({
          day,
          meal: { en: mealEn, ar: mealAr, fr: mealFr },
          isActive: isActive !== undefined ? isActive : true,
        });
      }
      updates.push(menuItem);
    }

    res.status(200).json({
      success: true,
      message: "All menu items updated successfully",
      menu: updates,
    });
  } catch (error) {
    console.error("Update multiple menu error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update menu",
      error: error.message,
    });
  }
};

// Reset menu to default
export const resetMenu = async (req, res) => {
  try {
    const defaultMenu = [
      {
        day: "sunday",
        meal: {
          en: "Milk & Honey with Whole Grain Bread",
          ar: "حليب بالعسل مع خبز القمح الكامل",
          fr: "Lait et miel avec pain complet",
        },
        isActive: true,
      },
      {
        day: "monday",
        meal: {
          en: "Cheese & Olive with Whole Wheat Bread",
          ar: "جبن وزيتون مع خبز القمح الكامل",
          fr: "Fromage et olive avec pain complet",
        },
        isActive: true,
      },
      {
        day: "tuesday",
        meal: {
          en: "Oatmeal with Dates & Nuts",
          ar: "شوفان مع تمر ومكسرات",
          fr: "Flocons d'avoine avec dattes et noix",
        },
        isActive: true,
      },
      {
        day: "wednesday",
        meal: {
          en: "Egg & Vegetable Omelette",
          ar: "عجة بالبيض والخضار",
          fr: "Omelette aux œufs et légumes",
        },
        isActive: true,
      },
      {
        day: "thursday",
        meal: {
          en: "Fresh Fruits & Yogurt with Honey",
          ar: "فواكه طازجة وزبادي بالعسل",
          fr: "Fruits frais et yaourt au miel",
        },
        isActive: true,
      },
    ];

    for (const item of defaultMenu) {
      await Menu.findOneAndUpdate(
        { day: item.day },
        { meal: item.meal, isActive: item.isActive },
        { upsert: true, returnDocument: "after" }
      );
    }

    const updatedMenu = await Menu.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Menu reset to default",
      menu: updatedMenu,
    });
  } catch (error) {
    console.error("Reset menu error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset menu",
      error: error.message,
    });
  }
};
