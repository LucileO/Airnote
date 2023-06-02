import GLOBALS from "../Globals";

export const Util = {
    groupToStr(group) {
        if (group == null) return "";
        else return `${GLOBALS.GROUPS[group.level]} - ${group.name} (${group.year})`;
    },
    getRoleOptions() {
        return Object.entries(GLOBALS.USER_ROLES).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },

    getClassOptions() {
        return Object.entries(GLOBALS.GROUPS).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },
    courseToStr(course) {
        if (course == null) return "";
        else return `${course.title}`;
    },
    moduleToStr(module) {
        if (module == null) return "";
        else return `${module.title}`;
    },
    formatUserName(user) {
        if (user == null) return "";
        else return `${user.firstname} ${user.lastname}`;
    },
};
