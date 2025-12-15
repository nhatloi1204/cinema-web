export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) {
    return ''
  }
  try {
    // Nếu chuỗi là '2025-12-16T10:30:00.000Z', nó sẽ trả về '2025-12-16'
    return dateString.split('T')[0]
  } catch (error) {
    console.error('Lỗi định dạng ngày tháng cho input date:', error)
    return ''
  }
}
