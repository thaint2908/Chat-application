export const sentTime = (date) => {
    const current = new Date();
    if ((current.getFullYear() - date.getFullYear())) {
        return current.getFullYear() - date.getFullYear() + "  năm trước"
    }
    if ((current.getMonth() - date.getMonth())) {

        return current.getMonth() - date.getMonth() + " tháng trước"
    }
    if ((current.getDate() - date.getDate())) {
        return current.getDate() - date.getDate() + " ngày trước"
    }
    if ((current.getHours() - date.getHours())) {
        return current.getHours() - date.getHours() + " giờ trước"
    }
    if ((current.getMinutes() - date.getMinutes())) {
        return current.getMinutes() - date.getMinutes() + " phút trước"
    }
    return "vừa xong"
}