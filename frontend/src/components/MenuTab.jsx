import React, { useState, useEffect } from "react";
import { Save, Edit2, Check, RefreshCw, X } from "lucide-react";
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
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text">Weekly Breakfast Menu</h2>
          <p className="text-text/60 text-sm">
            Edit the menu that appears on the website (Sunday - Thursday)
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span className="text-sm">Changes saved successfully!</span>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day) => (
          <div
            key={day}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Day Header */}
            <div className="p-4 bg-gradient-to-r from-green-one/5 to-green-two/5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-text text-lg">{dayNames[day]}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localMenu[day]?.active !== false}
                    onChange={() => handleToggleActive(day)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-one after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:duration-200"></div>
                </label>
              </div>
            </div>

            {/* Day Content */}
            <div className="p-4">
              {editingDay === day ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-text/70 block mb-1">
                      English
                    </label>
                    <textarea
                      value={editValueEn}
                      onChange={(e) => setEditValueEn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 text-sm transition-all"
                      rows="2"
                      placeholder="English meal description"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text/70 block mb-1">
                      العربية
                    </label>
                    <textarea
                      value={editValueAr}
                      onChange={(e) => setEditValueAr(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 text-sm font-cairo text-right transition-all"
                      rows="2"
                      placeholder="وصف الوجبة بالعربية"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text/70 block mb-1">
                      Français
                    </label>
                    <textarea
                      value={editValueFr}
                      onChange={(e) => setEditValueFr(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 text-sm transition-all"
                      rows="2"
                      placeholder="Description du repas en français"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-3 py-2 bg-green-one text-white rounded-lg text-sm font-medium hover:bg-green-two transition-all"
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
                      className="px-3 py-2 border border-gray-200 rounded-lg text-text/70 hover:bg-gray-50 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative">
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-text/70 text-xs">
                        <span className="font-semibold text-text/90">EN:</span>{" "}
                        {localMenu[day]?.meal?.en || (
                          <span className="italic text-text/40">Not set</span>
                        )}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-text/70 text-xs font-cairo">
                        <span className="font-semibold text-text/90">AR:</span>{" "}
                        {localMenu[day]?.meal?.ar || (
                          <span className="italic text-text/40">غير محدد</span>
                        )}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-text/70 text-xs">
                        <span className="font-semibold text-text/90">FR:</span>{" "}
                        {localMenu[day]?.meal?.fr || (
                          <span className="italic text-text/40">
                            Non défini
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(day, localMenu[day]?.meal)}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Edit2 className="w-4 h-4 text-green-one hover:text-green-two" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
        <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-green-one rounded-full"></span>
          Preview (as seen on website)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {days.map((day) => (
            <div
              key={day}
              className="text-center bg-white rounded-lg p-3 shadow-sm"
            >
              <div className="text-xs font-bold text-green-one mb-2 uppercase">
                {dayNames[day].slice(0, 3)}
              </div>
              <div className="text-xs text-text/70 leading-relaxed">
                {localMenu[day]?.active !== false && localMenu[day]?.meal?.en
                  ? localMenu[day].meal.en.length > 40
                    ? localMenu[day].meal.en.substring(0, 40) + "..."
                    : localMenu[day].meal.en
                  : "Not available"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuTab;
