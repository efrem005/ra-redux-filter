import { nanoid } from 'nanoid'
import { useEffect, type ChangeEvent } from 'react'
import {
  addService,
  resetForm,
  setEditingService,
  setFormErrors,
  setFormName,
  setFormPrice,
  updateService,
} from '../store/actions'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectEditingService, selectForm } from '../store/selectors'

export const ServiceForm = () => {
  const dispatch = useAppDispatch()
  const form = useAppSelector(selectForm)
  const editingService = useAppSelector(selectEditingService)

  useEffect(() => {
    if (editingService) {
      dispatch(setFormName(editingService.name))
      dispatch(setFormPrice(String(editingService.price)))
    }
  }, [editingService, dispatch])

  const validate = (): boolean => {
    const errors: { name?: string; price?: string } = {}

    if (!form.name.trim()) {
      errors.name = 'Название услуги обязательно'
    }

    if (!form.price.trim()) {
      errors.price = 'Цена обязательна'
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      errors.price = 'Цена должна быть положительным числом'
    }

    dispatch(setFormErrors(errors))
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault()

    if (!validate()) return

    const serviceData = {
      name: form.name.trim(),
      price: Number(form.price),
    }

    if (form.editingId) {
      dispatch(updateService({ id: form.editingId, ...serviceData }))
    } else {
      dispatch(addService({ id: nanoid(), ...serviceData }))
    }

    dispatch(resetForm())
  }

  const handleCancel = () => {
    dispatch(resetForm())
    dispatch(setEditingService(null))
  }

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <h2>{form.editingId ? 'Редактировать услугу' : 'Новая услуга'}</h2>

      <div className="form-group">
        <label htmlFor="name">Название услуги</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => dispatch(setFormName(e.target.value))}
          className={form.errors.name ? 'error' : ''}
          placeholder="Введите название услуги"
        />
        {form.errors.name && (
          <span className="error-message">{form.errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Цена</label>
        <input
          id="price"
          type="number"
          value={form.price}
          step="0.10"
          min="0"
          onChange={(e) => dispatch(setFormPrice(e.target.value))}
          className={form.errors.price ? 'error' : ''}
          placeholder="Введите цену"
        />
        {form.errors.price && (
          <span className="error-message">{form.errors.price}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {form.editingId ? 'Сохранить' : 'Добавить'}
        </button>
        {form.editingId && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}
