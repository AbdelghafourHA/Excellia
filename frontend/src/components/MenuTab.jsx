import React, { useState, useEffect } from "react";
import { Save, Edit2, Check, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import useMenu from "../stores/menu.store";

const MenuTab = () => {
  const {
    menu,
    loading,
    fetchMenu,
    updateMenuItem,
    updateMultipleMenu,
    resetMenu,
  } = useMenu();
  const [editingDay, setEditingDay] = useState(null);
  const [editValueEn, setEditValueEn] = useState("");
  const [editValueAr, setEditValueAr] = useState("");
  const [editValueFr, setEditValueFr] = useState("");
  const [saved, setSaved] = useState(false);
  const [localMenu, setLocalMenu] = useState({});

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
  const dayNames = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    // Convert menu array to object for easier access
    if (menu.length > 0) {
      const menuObj = {};
      menu.forEach((item) => {
        menuObj[item.day] = {
          meal: item.meal || { en: "", ar: "", fr: "" },
          active: item.isActive !== undefined ? item.isActive : true,
          _id: item._id,
        };
      });
      setLocalMenu(menuObj);
    }
  }, [menu]);

  const handleEdit = (day, currentMeal) => {
    setEditingDay(day);
    setEditValueEn(currentMeal?.en || "");
    setEditValueAr(currentMeal?.ar || "");
    setEditValueFr(currentMeal?.fr || "");
  };

  const handleSave = async () => {
    if (
      editingDay &&
      editValueEn.trim() &&
      editValueAr.trim() &&
      editValueFr.trim()
    ) {
      const success = await updateMenuItem(
        editingDay,
        editValueEn.trim(),
        editValueAr.trim(),
        editValueFr.trim(),
        localMenu[editingDay]?.active
      );
      if (success) {
        setEditingDay(null);
        setEditValueEn("");
        setEditValueAr("");
        setEditValueFr("");
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } else {
      toast.error(
        "Please fill in all language fields (English, Arabic, French)"
      );
    }
  };

  const handleToggleActive = async (day) => {
    const currentItem = localMenu[day];
    const newActiveState = !currentItem?.active;

    setLocalMenu({
      ...localMenu,
      [day]: { ...currentItem, active: newActiveState },
    });

    const success = await updateMenuItem(
      day,
      currentItem?.meal?.en || "",
      currentItem?.meal?.ar || "",
      currentItem?.meal?.fr || "",
      newActiveState
    );
    if (!success) {
      setLocalMenu({
        ...localMenu,
        [day]: { ...currentItem, active: currentItem?.active },
      });
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSaveAll = async () => {
    const menuItems = days.map((day) => ({
      day,
      mealEn: localMenu[day]?.meal?.en || "",
      mealAr: localMenu[day]?.meal?.ar || "",
      mealFr: localMenu[day]?.meal?.fr || "",
      isActive: localMenu[day]?.active !== false,
    }));

    const success = await updateMultipleMenu(menuItems);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset the menu to default values?"
      )
    ) {
      await resetMenu();
      toast.success("Menu reset to default");
    }
  };

  if (loading && menu.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-text">Weekly Breakfast Menu</h2>
          <p className="text-text/60 text-sm">
            Edit the menu that appears on the website (Sunday - Thursday)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </button>
          {/* <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-4 py-2 bg-green-one text-white rounded-lg hover:bg-green-two transition-colors"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button> */}
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-4 p-3 bg-green-one/10 text-green-one rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          Changes saved successfully!
        </div>
      )}

      {/* Menu Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-gray-200">
          {days.map((day) => (
            <div key={day} className="bg-white">
              {/* Day Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-text">{dayNames[day]}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localMenu[day]?.active !== false}
                      onChange={() => handleToggleActive(day)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-one after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
              </div>

              {/* Day Content */}
              <div className="p-4">
                {editingDay === day ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-text">
                        English
                      </label>
                      <textarea
                        value={editValueEn}
                        onChange={(e) => setEditValueEn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one text-sm mt-1"
                        rows="2"
                        placeholder="English meal description"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text">
                        العربية
                      </label>
                      <textarea
                        value={editValueAr}
                        onChange={(e) => setEditValueAr(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one text-sm mt-1 font-cairo"
                        rows="2"
                        placeholder="وصف الوجبة بالعربية"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text">
                        Français
                      </label>
                      <textarea
                        value={editValueFr}
                        onChange={(e) => setEditValueFr(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one text-sm mt-1"
                        rows="2"
                        placeholder="Description du repas en français"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-one text-white rounded-lg text-sm hover:bg-green-two"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingDay(null);
                          setEditValueEn("");
                          setEditValueAr("");
                          setEditValueFr("");
                        }}
                        className="px-3 py-1 border border-gray-200 rounded-lg text-text/70 hover:bg-gray-50 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative min-h-[80px]">
                    <div className="space-y-1">
                      <p className="text-text/70 text-xs">
                        <span className="font-semibold">EN:</span>{" "}
                        {localMenu[day]?.meal?.en || "—"}
                      </p>
                      <p className="text-text/70 text-xs font-cairo">
                        <span className="font-semibold">AR:</span>{" "}
                        {localMenu[day]?.meal?.ar || "—"}
                      </p>
                      <p className="text-text/70 text-xs">
                        <span className="font-semibold">FR:</span>{" "}
                        {localMenu[day]?.meal?.fr || "—"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit(day, localMenu[day]?.meal)}
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit2 className="w-4 h-4 text-text/40 hover:text-green-one" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-text mb-3">
          Preview (as seen on website)
        </h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {days.map((day) => (
              <div key={day} className="text-center">
                <div className="text-xs font-semibold text-text mb-1">
                  {dayNames[day].slice(0, 3)}
                </div>
                <div className="text-xs text-text/60">
                  {localMenu[day]?.active !== false && localMenu[day]?.meal?.en
                    ? localMenu[day].meal.en
                    : "Not available"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTab;
