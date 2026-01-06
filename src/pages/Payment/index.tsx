import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { Showtime } from '../../store/showtimeData/showtimeType'
import { Movie } from '../../store/movieData/movieType'

interface PaymentState {
  showtime: Showtime
  movie: Movie
  selectedSeats: string[]
  totalPrice: number
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as PaymentState | null

  if (!state) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Dữ liệu không hợp lệ
          </h1>
          <button
            onClick={() => navigate('/movies')}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all'
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    )
  }

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create booking and get client secret
  useEffect(() => {
    const createBooking = async () => {
      try {
        setLoading(true)
        setError(null)
        const apiUrl = import.meta.env.VITE_API_URL

        const response = await fetch(`${apiUrl}/user/bookings/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            showtimeId: state.showtime._id,
            seats: state.selectedSeats,
            shopItems: [],
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Không thể tạo đơn đặt vé')
        }

        const data = await response.json()
        setClientSecret(data.payment.clientSecret)
      } catch (err) {
        console.error('Error creating booking:', err)
        setError(err instanceof Error ? err.message : 'Lỗi khi tạo đơn đặt vé')
      } finally {
        setLoading(false)
      }
    }

    createBooking()
  }, [state])

  const options = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'night' as const,
          variables: {
            colorPrimary: '#3b82f6',
            colorBackground: '#1f2937',
            colorText: '#ffffff',
            colorDanger: '#ef4444',
          },
        },
      }
    : undefined

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8 px-4'>
      {/* Header */}
      <div className='max-w-2xl mx-auto mb-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-6 transition-colors'
        >
          <FaArrowLeft /> Quay lại
        </button>

        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
          <h1 className='text-3xl md:text-4xl font-bungee text-white uppercase mb-2 tracking-wider'>
            Thanh toán
          </h1>
          <p className='text-gray-300'>{state.movie.title}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Payment Form */}
        <div className='lg:col-span-2'>
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8'>
            {loading ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4' />
                <p className='text-gray-400'>Đang tải form thanh toán...</p>
              </div>
            ) : error ? (
              <div className='flex items-start gap-4 p-4 bg-red-900/20 border border-red-700/50 rounded-lg'>
                <FaExclamationTriangle className='text-red-400 mt-1 flex-shrink-0' />
                <div>
                  <p className='text-red-400 font-bold'>Lỗi</p>
                  <p className='text-red-300 text-sm mt-1'>{error}</p>
                </div>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm clientSecret={clientSecret} state={state} />
              </Elements>
            ) : null}
          </div>
        </div>

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <div className='sticky top-24 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-6 tracking-wider'>
              Tóm tắt đơn
            </h2>

            {/* Movie & Showtime Info */}
            <div className='space-y-4 pb-6 border-b border-gray-600'>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Phim
                </p>
                <p className='text-sm text-white font-semibold'>
                  {state.movie.title}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Rạp
                </p>
                <p className='text-sm text-white font-semibold'>
                  {state.showtime.theaterId?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Phòng
                </p>
                <p className='text-sm text-white font-semibold'>
                  {state.showtime.roomId?.name || 'N/A'}
                </p>
              </div>
            </div>

            {/* Seats */}
            <div className='py-6 border-b border-gray-600'>
              <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-3'>
                Ghế ({state.selectedSeats.length})
              </p>
              <div className='flex flex-wrap gap-2'>
                {state.selectedSeats.sort().map(seat => (
                  <span
                    key={seat}
                    className='px-2.5 py-1 bg-blue-600/30 text-blue-400 text-xs font-bold rounded border border-blue-500/50'
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className='py-6 space-y-3'>
              <div className='flex justify-between text-sm text-gray-300'>
                <span>Giá vé:</span>
                <span className='font-semibold'>
                  {state.showtime.price.toLocaleString('vi-VN')}đ ×{' '}
                  {state.selectedSeats.length}
                </span>
              </div>
              <div className='flex justify-between text-lg font-bold text-blue-400 border-t border-gray-600 pt-3'>
                <span>Tổng cộng:</span>
                <span>{state.totalPrice.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Info */}
            <div className='mt-6 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg'>
              <p className='text-xs text-blue-200 text-center'>
                ℹ Vé sẽ được gửi đến email của bạn sau khi thanh toán thành
                công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PaymentFormProps {
  clientSecret: string
  state: PaymentState
}

function PaymentForm({ state }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          redirect: 'if_required',
        },
      )

      if (stripeError) {
        setError(stripeError.message || 'Lỗi xử lý thanh toán')
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        setSuccess(true)
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          navigate('/booking-success', {
            state: {
              bookingId: paymentIntent.id,
              movie: state.movie,
              showtime: state.showtime,
              selectedSeats: state.selectedSeats,
            },
          })
        }, 2000)
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError(
        err instanceof Error ? err.message : 'Lỗi thanh toán không xác định',
      )
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='mb-4 p-3 bg-green-900/20 border border-green-700/50 rounded-full'>
          <FaCheckCircle className='text-green-400 text-3xl' />
        </div>
        <h3 className='text-2xl font-bold text-green-400 mb-2'>
          Thanh toán thành công!
        </h3>
        <p className='text-gray-400 text-center mb-6'>
          Đang chuyển hướng đến trang xác nhận...
        </p>
        <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {error && (
        <div className='flex items-start gap-4 p-4 bg-red-900/20 border border-red-700/50 rounded-lg'>
          <FaExclamationTriangle className='text-red-400 mt-1 flex-shrink-0' />
          <div>
            <p className='text-red-400 font-bold'>Lỗi thanh toán</p>
            <p className='text-red-300 text-sm mt-1'>{error}</p>
          </div>
        </div>
      )}

      <div className='space-y-4'>
        <label className='block text-sm text-gray-400 uppercase tracking-wider font-bold mb-3'>
          Thông tin thanh toán
        </label>
        <PaymentElement />
      </div>

      <button
        type='submit'
        disabled={!stripe || !elements || isProcessing}
        className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2'
      >
        {isProcessing ? (
          <>
            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            Đang xử lý...
          </>
        ) : (
          <>
            <FaCheckCircle /> Thanh toán{' '}
            {state.totalPrice.toLocaleString('vi-VN')}đ
          </>
        )}
      </button>

      <p className='text-xs text-gray-400 text-center'>
        Thẻ tín dụng/ghi nợ được mã hóa và an toàn
      </p>
    </form>
  )
}
