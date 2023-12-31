'use client';

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalMarginTop = useCallback(() => {
    if (modalRef.current) {
      const viewportHeight = window.innerHeight;
      const modalHeight = modalRef.current.clientHeight;

      if (modalHeight > viewportHeight) {
        modalRef.current.style.marginTop = `calc(${
          modalHeight - viewportHeight
        }px + 3rem)`;
      }
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModal && !modalRef?.current?.contains(event.target as Node)) {
        setShowModal(false);
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, showModal, onClose]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    handleModalMarginTop();
  }, [handleModalMarginTop]);

  const handleClose = () => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div
          className={`translate duration-300 h-full ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='modal-content' ref={modalRef}>
            <div
              className='
            p-6 
            flex-center 
            border-b 
            relative 
            rounded-t
            '
            >
              <button
                className='
                absolute 
                left-9 
                cursor-pointer 
                transition 
                hover:opacity-70 
                border-0 
                p-1'
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <p className='text-bold-large'>{title}</p>
            </div>
            <div className='relative p-6 flex-auto'>{body}</div>
            <div className='flex-col-start gap-2 p-6'>
              <div className='flex items-center gap-4 w-full'>
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={secondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={onSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
