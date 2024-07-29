'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { formValidationSchema } from '@/helpers/formValidationSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2, CloudUpload, Eraser } from 'lucide-react';

interface IFormInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	birthDate: Date;
	acceptTermsAndConditions: boolean;
}

export default function Home() {
	const form = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			birthDate: undefined,
			acceptTermsAndConditions: false,
		},
		resolver: yupResolver(formValidationSchema),
	});

	const {
		formState: { isDirty, isValid, isLoading },
	} = form;

	const onSubmit = (data: IFormInput) => {
		form.reset();
		console.log(data);
	};

	return (
		<main className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Реєстрація</CardTitle>
					<CardDescription>Реєструйтесь зараз або ніколи</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							{/* firstName */}
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{`Ім'я`}</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Ваше ім'я" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* lastName */}
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem className='mt-3'>
										<FormLabel>Прізвище</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Ваше прізвище' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* email */}
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='mt-3'>
										<FormLabel>Електронна пошта</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='email'
												placeholder='Ваша електронна пошта'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* password */}
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem className='mt-3'>
										<FormLabel>Пароль</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='password'
												placeholder='Придумайте пароль'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* birthdate */}
							<FormField
								control={form.control}
								name='birthDate'
								render={({ field }) => (
									<FormItem className='flex flex-col mt-3'>
										<FormLabel>Дата народження</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={'outline'}>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Виберіть дату</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* terms and conditions checkbox */}
							<FormField
								control={form.control}
								name='acceptTermsAndConditions'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 p-2 mt-3'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className='space-y-1 leading-none'>
											<FormLabel>Погодитись не читаючи</FormLabel>
										</div>
									</FormItem>
								)}
							/>
							<div className='flex gap-2 mt-4 justify-between'>
								<Button type='submit' disabled={!isDirty || !isValid}>
									{!isLoading ? (
										<>
											<CloudUpload className='mr-2 h-4 w-4' />
											Надіслати
										</>
									) : (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Зачекайте
										</>
									)}
								</Button>
								<Button
									type='button'
									onClick={() => form.reset()}
									variant='destructive'
									disabled={!isDirty}
								>
									<Eraser className='mr-2 h-4 w-4' />
									Reset
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
