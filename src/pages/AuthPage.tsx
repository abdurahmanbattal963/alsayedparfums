import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('البريد الإلكتروني غير صالح');
const passwordSchema = z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
const nameSchema = z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل');

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = { email: '', password: '', fullName: '' };
    let isValid = true;

    try {
      emailSchema.parse(formData.email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
        isValid = false;
      }
    }

    try {
      passwordSchema.parse(formData.password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
        isValid = false;
      }
    }

    if (!isLogin) {
      try {
        nameSchema.parse(formData.fullName);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.fullName = e.errors[0].message;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'خطأ في تسجيل الدخول',
              description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'خطأ',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'تم تسجيل الدخول بنجاح',
            description: 'مرحباً بك في ALSAYED PERFUMES',
          });
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'خطأ',
              description: 'هذا البريد الإلكتروني مسجل بالفعل',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'خطأ',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'تم إنشاء الحساب بنجاح',
            description: 'يرجى تفقد بريدك الإلكتروني لتأكيد الحساب',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-display font-semibold tracking-ultra-wide">
                ALSAYED
              </span>
              <span className="block text-xs tracking-[0.3em] uppercase text-gold">
                PERFUMES
              </span>
            </Link>
            <h1 className="text-2xl font-display font-semibold mb-2">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'مرحباً بعودتك' : 'انضم إلى عائلة ALSAYED PERFUMES'}
            </p>
          </div>

          {/* Form */}
          <div className="bg-card border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      className={cn(
                        "w-full pl-12 pr-4 py-3 bg-background border focus:border-gold focus:outline-none transition-colors",
                        errors.fullName ? 'border-destructive' : 'border-border'
                      )}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className={cn(
                      "w-full pl-12 pr-4 py-3 bg-background border focus:border-gold focus:outline-none transition-colors",
                      errors.email ? 'border-destructive' : 'border-border'
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={cn(
                      "w-full pl-12 pr-12 py-3 bg-background border focus:border-gold focus:outline-none transition-colors",
                      errors.password ? 'border-destructive' : 'border-border'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading 
                  ? 'جاري التحميل...' 
                  : isLogin 
                    ? 'تسجيل الدخول' 
                    : 'إنشاء حساب'
                }
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({ email: '', password: '', fullName: '' });
                  }}
                  className="text-gold hover:underline font-medium"
                >
                  {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                </button>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
