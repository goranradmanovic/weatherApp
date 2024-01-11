import Swal from 'sweetalert2'

export const useNotification = (type, msg, options) => Swal.fire({ icon: type, title: msg, ...options })