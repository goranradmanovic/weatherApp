import Swal from 'sweetalert2'

export const notification = (type, msg, options) => Swal.fire({ icon: type, title: msg, ...options })